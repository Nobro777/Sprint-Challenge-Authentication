const request = require('supertest'); 

const server = require('../api/server');

const db = require('../database/dbConfig');

describe('jokes-router', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })

    describe('GET jokes', () => {
        it('should return a status 401', () => {
            return request(server)
                .get('/api/jokes')
                .then(response => {
                    expect(response.status).toBe(401)
                })
        })
        it('should return JSON string', () => {
            return request(server)
            .get('/api/jokes')
            .then(res => {
                expect(res.type).toMatch(/json/i)
            })
        })
    })
})