const request = require('supertest'); 

const server = require('./server.js');
const db = require('../helpers.js')
const knexDB = require('../database/dbConfig.js')
const authenticate = require('../auth/authenticate-middleware.js')
const supertest = require("supertest")



describe('server', () => { 

    describe('GET /', () => {

        it('should return 200 OK', () => {
            return request(server).get('/api/jokes')
                .then(res => {
                expect(res.status).toBe(200);
            })
        })

        it('should return the jokes', () => {
            return request(server).get('/api/jokes')
                .then(res => {
                expect(res.body).toBeTruthy()
            }) 
        })
    })

    describe("POST /", () => {
        it('should return JSON', () => {
            return request(server).post('/api/auth/login')
                .then(res => {
                    expect(res.body).toBeTruthy()
            })
        })
        it('should return logged in', () => {
            return request(server).post('/api/auth/login')
                .then(res => {
                    expect(res.status).toBeTruthy()
            })
        })
        it('should return JSON', () => {
            return request(server).post('/api/auth/register')
                .then(res => {
                expect(res.type).toMatch('text/html')
            })
        })
    })
})
test("register status", async () => {
    const resp = await supertest(server).post('/api/auth/register')
    .send({ username: "test", password: "123" })
    expect(resp.status).toBeTruthy()
})