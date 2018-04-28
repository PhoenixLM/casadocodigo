const mysql = require('mysql');

function createConnection() {
    let database = 'casadocodigo';
    database = process.env.NODE_ENV === 'test' ? 'casadocodigo-test' : 'casadocodigo';
    return mysql.createConnection({
        host:     'localhost',
        user:     'root',
        password: '',
        database: database
    });
};

module.exports = function() {
    return createConnection;
}