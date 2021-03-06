import 'jest'
import * as request from 'supertest'

const address: string = (<any>global).address
const auth: string = (<any>global).auth

test('get /restaurants', () => {
    return request(address)
        .get('/restaurants')
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.items).toBeInstanceOf(Array)
        })
        .catch(fail)
})

test('get /restaurants/aaaa - not found', () => {
    return request(address)
        .get('/restaurants/aaaa')
        .then(response => {
            expect(response.status).toBe(404)
        })
        .catch(fail)
})

test('post /restaurants', () => {
    return request(address)
        .post('/restaurants')
        .set('Authorization', auth)
        .send({
            name: 'Subway',
            menu: [{ name: "Frango Teriyaki", price: 9 }]
        })
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body._id).toBeDefined()
            expect(response.body.name).toBe('Subway')
            expect(response.body.menu).toBeInstanceOf(Array)
            expect(response.body.menu).toHaveLength(1)
            expect(response.body.menu[0]).toMatchObject({ name: "Frango Teriyaki", price: 9 })
        })
        .catch(fail)
})
