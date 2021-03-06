import 'jest'
import * as mongoose from 'mongoose'
import * as request from 'supertest'

const address: string = (<any>global).address
const auth: string = (<any>global).auth

test('get /reviews', () => {
    return request(address)
            .get('/reviews')
            .then(response => {
                expect(response.status).toBe(200)
                expect(response.body.items).toBeInstanceOf(Array)
            })
            .catch(fail)
})

test('get /reviews/aaaa - not found', () => {
    return request(address)
        .get('/reviews/aaaa')
        .then(response=>{
            expect(response.status).toBe(404)
        })
        .catch(fail)
})

test('post /reviews', ()=>{
    return request(address)
        .post('/reviews')
        .set('Authorization', auth)
        .send({
            date: '2020-11-04T23:53:00',
            rating: 4,
            comments: 'Bem organizado',
            user: new mongoose.Types.ObjectId(),
            restaurant: new mongoose.Types.ObjectId()
        })
        .then(response=>{
            expect(response.status).toBe(200)
            expect(response.body._id).toBeDefined()
            expect(response.body.rating).toBe(4)
            expect(response.body.comments).toBe('Bem organizado')
            expect(response.body.user).toBeDefined()
            expect(response.body.restaurant).toBeDefined()
        })
        .catch(fail)
})