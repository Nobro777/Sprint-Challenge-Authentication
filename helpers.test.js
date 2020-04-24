const Users = require('./helpers');
const db = require('./database/dbConfig');

describe('helpers model', function() {
    it('should use the development environment', function() {
        expect(process.env.DB_ENV).toBe();
    })
})
