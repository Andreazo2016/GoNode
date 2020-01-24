'use strict'
const crypto = require('crypto')
const moment = require('moment')
const User = use('App/Models/User')
const Mail = use('Mail')


class ForgotPasswordController {

    async store({ request, response }) {
        try {

            const email = request.input('email')

            const user = await User.findByOrFail('email', email)

            /**Cria um token */
            user.token = crypto.randomBytes(10).toString('hex')

            /**seta a data de expiração */
            user.token_created_at = new Date()

            await user.save();

            /*Envia o email de recuperação */
           
            const token =  user.token
            const link = `${request.input('redirect_url')}?token=${token}`

            await Mail.send(
                'emails.reset',
                {
                    email,
                    token,
                    link
                },
                message => {
                    message
                        .from('andreazocoisas@gmail.com', 'Andreazo | bootcamp')
                        .to(user.email)
                        .subject('Recuperação de senha')
                }
            )

        } catch (error) {
            return response.status(error.status).send({ error: { message: 'Algo de errado não está certo. Esse email existe?' } })
        }

    }

    async update({ request, response }) {
        try {

            const { token, password } = request.all()

            const user = await User.findByOrFail('token', token)


            /* Verifica se o usuário não está com token expirado */
            const tokenExpired = moment()
                .subtract('2', 'days')
                .isAfter(user.token_created_at)

            if (tokenExpired) {
                return response
                    .status(401)
                    .send({ error: { message: 'Seu token está expirado.' } })
            }

            /*Reseta e troca a senha */
            user.token = null
            user.token_created_at = null
            user.password = password

            await user.save()




        } catch (error) {
            return response.status(error.status).send({ error: { message: 'Algo deu errado. Ops!!!!' } })

        }
    }
}

module.exports = ForgotPasswordController
