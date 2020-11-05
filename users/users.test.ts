import 'jest'
import * as request from 'supertest'
import {Server} from '../server/server'
import {environment} from '../common/environment'
import {usersRouter} from './users.router'
import {User} from './users.model'

let address: string = (<any>global).address

test('get /users', () =>{
    return request(address)
        .get('/users')
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.items).toBeInstanceOf(Array)
        }).catch(fail)
})

test('post /users', () =>{
    return request(address)
        .post('/users')
        .send({
            name: 'Clint Barton',
            email: 'barton@marvel.com',
            password: 'arqueiro',
            cpf: '076.212.840-21'
        })
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body._id).toBeDefined()
            expect(response.body.name).toBe('Clint Barton')
            expect(response.body.email).toBe('barton@marvel.com')
            expect(response.body.cpf).toBe('076.212.840-21')
            expect(response.body.password).toBeUndefined()
        }).catch(fail)
})

test('get /users/aaaa - not found', () => {
    return request(address)
        .get('/users/aaaa')
        .then(response => {
            expect(response.status).toBe(404)
        }).catch(fail)
})

test('patch /users/:id', () => {
    return request(address)
        .post('/users')
        .send({
            name: 'Thor',
            email: 'thor@marvel.com',
            password: 'thor'
        })
        .then(response => request(address)
                          .patch(`/users/${response.body._id}`)
                          .send({
                              email: 'askard@marvel.com'
                          }))
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body._id).toBeDefined()
            expect(response.body.name).toBe('Thor')
            expect(response.body.email).toBe('askard@marvel.com')
            expect(response.body.password).toBeUndefined()
        })
        .catch(fail)
})