'use strict'

const Database = use('Database')
const User = use('App/Models/User')
class UserController {

    async index(){
        const users = await User.all();

        return users;
    }


    async store ({ request }){

    
        const data = request.only(['username', 'email','password'])
        
        const trx = await Database.beginTransaction()

        const user = await User.create(data, trx)

        await trx.commit()
                
        return user

    }
}

module.exports = UserController
