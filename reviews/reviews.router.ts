import * as restify from 'restify'
import * as mongoose from 'mongoose'
import {ModelRouter} from '../common/model-router'
import {Review} from './reviews.model'

import {authorize} from '../security/authz.handler'

class ReviewsRouter extends ModelRouter<Review>{
    constructor(){
        super(Review)
    }

    envelope(document){
        let resource = super.envelope(document)
        const restId = document.restaurant._id ? document.restaurant._id : document.restaurant //Pode ser apenas o ID ou o Restaurante Populado
        resource._links.restaurant = `/restaurants/${restId}`
        return resource
    }

    protected prepareOne(query: mongoose.DocumentQuery<Review, Review>): mongoose.DocumentQuery<Review,Review>{
        return query.populate('user', 'name')
                    .populate('restaurant', 'name')
    }
    
    applyRoutes(application: restify.Server){
        application.get(`${this.basePath}`, this.findAll)
        application.get(`${this.basePath}/:id`, [this.validadeId ,this.findById])
        application.post(`${this.basePath}`, [authorize('user'), this.save])
        application.del(`${this.basePath}/:id`, [authorize('user'), this.validadeId ,this.delete])
    }
}

export const reviewsRouter = new ReviewsRouter()