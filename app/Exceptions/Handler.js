'use strict'

const Env = use('Env')
const Youch = use('youch')
const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler extends BaseExceptionHandler {
  

  /**Captura todo tipo de erro que acontecer nos controller */
  async handle (error, { request, response }) {
       
    //Verifica se foi um erro de validação 
    if( error.name === 'ValidationException'){
      return response.status(error.status).send(error.messages)
    }

    if(Env.get('NODE_ENV') === 'development'){//verifica se o ambiente ta em produção para mostrat as msg de erro
      const youch = new Youch( error, request.request)
      const errorJSON = await youch.toJSON()
      return response.status(error.status).send(errorJSON)
    }
    return response.status(error.status)
  }

 
  /**Aqui eu posso fazer com error. ex: salva no BD, enviar email, para um ver no futuro */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler
