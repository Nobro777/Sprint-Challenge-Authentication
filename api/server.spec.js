const request = require('supertest');

const server = require('./server');

// describe('server', function() {
//     it('runs the tests successfully', function() {
//         expect(true).toBe(true)
//     })

    describe('GET /', function() {
        it('should return 200', function() {
            return request(server).get('/')
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('should return JSON', function() {
            return request(server).get('/')
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                })
        })
    })