'use strict'

const Route = use('Route')

Route.get('/users','UserController.index')
Route.post('/users','UserController.store')

Route.post('/session','SessionController.store')

Route.post('/passwords','ForgotPasswordController.store')
Route.put('/passwords','ForgotPasswordController.update')

Route.post('/upload','FileController.store')
Route.get('/files/:id','FileController.show')

