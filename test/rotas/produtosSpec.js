const http = require('http');
const assert = require('assert');
const express = require('../../custom-express')();
const request = require('supertest')(express);
const DatabaseCleaner = require('database-cleaner');

/*
function limpaTabelas(done) {
    //console.log("Limpando tabelas");
    const conn = express.infra.connectionfactory();
    conn.query('delete from livros', () => {
        //console.log("Tabelas limpas");
        done();
    });
    conn.end();
}
*/

describe('#ProdutosController', () => {
    beforeEach( (done) => {
        let databaseCleaner = new DatabaseCleaner('mysql');
        const conn = express.infra.connectionfactory();
        databaseCleaner.clean(conn, () => {
            conn.end();
            done();
        });
    });

    it('should list the products in JSON format', done => {
        /*
        const options = {
            hostname:'localhost',
            port: 3000,
            path: '/produtos',
            headers: {
                'accept': 'application/json'
            }
        }

        http.get(options, (res) => {
            assert.equal(res.statusCode, 200);
            assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
            done(); 
        })
        */
        request.get('/produtos')
               .set('Accept', 'application/json')
               .expect('content-type', /json/)
               .expect(200, done);
    });

    it('should list the products in HTML format', (done) =>  {
        request.get('/produtos')
               .expect('Content-Type', /html/)
               .expect(200, done)
    });

    it('should register a product and redirect after POST', (done) => {
        request.post('/produtos').send({
            'titulo': 'Novo Livro',
            'preco': 0.0,
            'descricao': 'livro de testes'
        })
               .expect('content-type', /text/)
               .expect(302, done);
    });

    it('should refuse to register a product with invalid atributes', (done) => {
        request.post('/produtos').send({
            'titulo': '',
            'preco': null,
            'descricao': ''
        })
               .expect('content-type', /text/)
               .expect(400, done);
    });
});