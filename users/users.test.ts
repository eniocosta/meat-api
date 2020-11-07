import 'jest'
import * as request from 'supertest'

const address: string = (<any>global).address
const auth: string = (<any>global).auth

test('get /users', () =>{
    return request(address)
        .get('/users')
        .set('Authorization', auth)
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.items).toBeInstanceOf(Array)
        }).catch(fail)
})

test('post /users', () =>{
    return request(address)
        .post('/users')
        .set('Authorization', auth)
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

test('post /users - nome obrigatorio', () =>  {
    return request(address)
        .post('/users')
        .set('Authorization', auth)
        .send({
            email: 'antman@marvel.com',
            password: '123456',
            cpf: '420.158.490-92'
        })
        .then(response => {
            expect(response.status).toBe(400)
            expect(response.body.errors).toBeInstanceOf(Array)
            expect(response.body.errors[0].message).toContain('name')
        })
        .catch(fail)
  })

test('get /users/aaaa - not found', () => {
    return request(address)
        .get('/users/aaaa')
        .set('Authorization', auth)
        .then(response => {
            expect(response.status).toBe(404)
        }).catch(fail)
})

test('get /users - findByEmail', () => {
    return request(address)
        .post('/users')
        .set('Authorization', auth)
        .send({
            name: 'Scott Lang',
            email: 'antman@marvel.com',
            password: '123456',
        }).then(response => request(address)
            .get('/users')
            .query({email: 'antman@marvel.com'}))
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.items).toBeInstanceOf(Array)
            expect(response.body.items).toHaveLength(1)
            expect(response.body.items[0].email).toBe('antman@marvel.com')
        }).catch(fail)
})

test('get /users/:id', ()=>{
    return request(address)
        .post('/users')
        .set('Authorization', auth)
        .send({
            name: 'T"Challa',
            email: 'pantera@marvel.com',
            password: 'blackpanter',
            cpf: '089.705.860-75'
        }).then(response => request(address)
            .get(`/users/${response.body._id}`))
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.name).toBe('T"Challa')
            expect(response.body.email).toBe('pantera@marvel.com')
            expect(response.body.cpf).toBe('089.705.860-75')
            expect(response.body.password).toBeUndefined()
        }).catch(fail)
})

test('delete /users/aaaa - not found', () => {
    return request(address)
        .delete(`/users/aaaa`)
        .set('Authorization', auth)
        .then(response => {
            expect(response.status).toBe(404)
        }).catch(fail)
})

test('delete /users:/id', ()=>{
    return request(address)
        .post('/users')
        .set('Authorization', auth)
        .send({
            name: 'Peter Quill',
            email: 'starlord@marvel.com',
            password: '123456',
            cpf: '291.270.710-22'
        }).then(response => request(address)
            .delete(`/users/${response.body._id}`))
        .then(response => {
            expect(response.status).toBe(204)
        }).catch(fail)
})

test('post /users - cpf invalido', ()=>{
    return request(address)
        .post('/users')
        .set('Authorization', auth)
        .send({
            name: 'Gamora',
            email: 'gamora@marvel.com',
            password: '123456',
            cpf: '730.493.000-00'
        })
        .then(response => {
            expect(response.status).toBe(400)
            expect(response.body.errors).toBeInstanceOf(Array)
            expect(response.body.errors).toHaveLength(1)
            expect(response.body.errors[0].message).toContain('Invalid CPF')
        })
        .catch(fail)
})

test('post /users - email duplicado', ()=>{
    return request(address)
        .post('/users')
        .set('Authorization', auth)
        .send({
            name: 'Rocket',
            email: 'guardao1@marvel.com',
            password: '123456',
            cpf: '290.692.580-21'
        }).then(response => request(address)
            .post('/users')
            .send({
                name: 'Drax O Destruidor',
                email: 'guardao1@marvel.com',
                password: '123456',
                cpf: '143.492.150-69'
            }))
        .then(response=>{
            expect(response.status).toBe(400)
            expect(response.body.message).toContain('E11000 duplicate key')
        })
        .catch(fail)
})

test('patch /users/aaaa - not found', ()=>{
    return request(address)
        .patch(`/users/aaaa`)
        .set('Authorization', auth)
        .then(response => {
            expect(response.status).toBe(404)
        }).catch(fail)
})

test('patch /users/:id', () => {
    return request(address)
        .post('/users')
        .set('Authorization', auth)
        .send({
            name: 'Thor',
            email: 'thor@marvel.com',
            password: 'thor'
        })
        .then(response => request(address)
                          .patch(`/users/${response.body._id}`)
                          .send({
                              email: 'asgard@marvel.com'
                          }))
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body._id).toBeDefined()
            expect(response.body.name).toBe('Thor')
            expect(response.body.email).toBe('asgard@marvel.com')
            expect(response.body.password).toBeUndefined()
        })
        .catch(fail)
})

test('put /users/aaaa - not found', () => {
    return request(address)
        .put(`/users/aaaa`)
        .set('Authorization', auth)
        .then(response => {
            expect(response.status).toBe(404)
        }).catch(fail)
})
  
test('put /users/:id', ()=>{
    return request(address)
        .post('/users')
        .set('Authorization', auth)
        .send({
            name: 'Groot',
            email: 'iamgroot@marvel.com',
            password: '123456',
            cpf: '967.361.490-37',
            gender: 'Male'
        }).then(response => request(address)
            .put(`/users/${response.body._id}`)
            .send({
                name: 'Groot Baby',
                email: 'iamgroot@marvel.com',
                password: '123456',
                cpf: '967.361.490-37'
            }))
        .then(response=>{
            expect(response.status).toBe(200)
            expect(response.body.name).toBe('Groot Baby')
            expect(response.body.email).toBe('iamgroot@marvel.com')
            expect(response.body.cpf).toBe('967.361.490-37')
            expect(response.body.gender).toBeUndefined()
            expect(response.body.password).toBeUndefined()
        }).catch(fail)
})