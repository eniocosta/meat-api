import * as restify from 'restify'
import {ModelRouter} from '../common/model-router'
import {User} from './users.model'
import {authenticate} from '../security/auth.handler'
import {authorize} from '../security/authz.handler'
class UsersRouter extends ModelRouter<User>{
    
    constructor(){
        super(User)
        this.on('beforeRender', document=>{
          document.password = undefined
        })
    }

    findByEmail = (req, resp, next) => {
        if(req.query.email){
            User.findByEmail(req.query.email)
                .then(user => user ? [user] : [])
                .then(this.renderAll(resp, next,{
                    pageSize: this.pageSize,
                    url: req.url
                }))
                .catch(next)
        }else{
            next()
        }
    }

    applyRoutes(application: restify.Server){
        application.get({path:`${this.basePath}`, version: '2.0.0'}, [authorize('admin'), this.findByEmail, this.findAll])
        application.get({path:`${this.basePath}`, version: '1.0.0'}, [authorize('admin'), this.findAll])
        
        application.get(`${this.basePath}/:id`, [authorize('admin'), this.validadeId ,this.findById])
        application.post(`${this.basePath}`, [authorize('admin'), this.save])
        application.put(`${this.basePath}/:id`, [authorize('admin'), this.validadeId ,this.replace])
        application.patch(`${this.basePath}/:id`, [authorize('admin'), this.validadeId ,this.update])
        application.del(`${this.basePath}/:id`, [authorize('admin'), this.validadeId ,this.delete])

        application.post(`${this.basePath}/authenticate`, authenticate)
    }
}

export const usersRouter = new UsersRouter()