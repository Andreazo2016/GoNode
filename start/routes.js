'use strict'

const Route = use('Route')

Route.get('/users','UserController.index')

Route.post('/users','UserController.store').validator('User')

Route.post('/session','SessionController.store').validator('Session')

Route.post('/passwords','ForgotPasswordController.store').validator('ForgotPassword')
Route.put('/passwords','ForgotPasswordController.update').validator('ResetPassword')

Route.get('/files/:id','FileController.show')


/**Rotas que nescessita de Token para acessá-las */
Route.group( ()=> {
    Route.post('/files','FileController.store')
    /**Controler que vai abrangir os método apenas de Api. (index,create, show, update, destroy) */
    Route.resource('/projects', 'ProjectController')
    .apiOnly()
    .validator( new Map(
        [
            [
                ['/projects.store'],
                ['Project']
            ]
        ]
    ))

    /**Cria uma concatenação de url ex: ( /projects/:id/task) */
    Route.resource('/projects.tasks', 'TaskController')
    .validator( new Map(
        [
            [
                ['/projects.tasks.store'],
                ['Task']
            ]
        ]
    ))
    .apiOnly()

}).middleware(['auth'])






