const request = require('supertest'); 

const server = require('../api/server')

const db = require('../database/dbConfig')


describe('auth-router', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })

    describe('POST to register', () => {
        it('should return 201 on successful register', () => {
            return request(server)
                .post('/api/auth/register')
                .send({ username: 'testing', password: 'testing123' })
                .then(response => {
                    expect(response.status).toBe(201)
            })
        })
        it("should return a 500 for incomplete password", () => {
            return request(server)
                .post("/api/auth/register")
                .send({ username: 'testing', password: 3})
                .then(response => {
                expect(response.status).toBe(500);
            });
        });
    })

    describe('POST to login', () => {
        it('should return 401 error', () => {
            return request(server)
                .post('/api/auth/login')
                .send({ username: '', password: '' })
                .then(response => {
                    expect(response.status).toBe(401)
                })
        })
        it("should return a 401 error because of the password being a number", () => {
            return request(server)
                .post("/api/auth/login")
                .send({ username: 'username', password: 3})
                .then(response => {
                    expect(response.status).toBe(401);
            });
        });
    })
}) 