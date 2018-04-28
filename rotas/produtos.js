//const connectionFactory = require('../infra/connectionfactory');
//const ProdutoDao = require('../infra/ProdutoDao')
//const bodyParser = require('body-parser');

module.exports = (app) => {
    app.get('/produtos', (req, res) => {
        const conn = app.infra.connectionfactory();
        const produtoDao = new app.infra.ProdutoDao(conn);
        produtoDao.lista((error, results) =>
            res.format({
                html: () => res.render('produtos/lista', { lista: results }),
                json: () => res.json(results)
            }));
        conn.end();
    });

    app.get('/produtos/form', (req, res) => {
        res.render('produtos/form');
    });

    app.get('/produtos/json', (req, res) => {
        const conn = app.infra.connectionfactory();
        const produtoDAO = new app.infra.ProdutoDao(conn);
        produtoDAO.lista((err, results) => res.json(results));
        conn.end();
    });

    app.get('/produtos/:id', (req, res) => {
        const id = req.params.id;
        console.log(id);
        const conn = app.infra.connectionfactory();
        const produtoDAO = new app.infra.ProdutoDao(conn);
        produtoDAO.obtem(id, (err, result) => res.json(result));
        conn.end();
    });

    
    app.post('/produtos', (req, res) => {
        const livro = req.body;
        req.assert('titulo', 'Título deve ser preenchido').notEmpty();
        req.assert('preco', 'Preco deve ser um numero').isFloat();
        const errors = req.validationErrors();
        if (errors) {
            //console.log('há erros de validação')
            res.format({
                html: () => res.status(400).render('produtos/form', { validationErrors: errors }),
                json: () => res.status(400).send(errors)
            })
        } else {
            const conn = app.infra.connectionfactory();
            const produtoDAO = new app.infra.ProdutoDao(conn);
            //console.log(livro);
            produtoDAO.salva(livro, (err, result) => {
                if (!err) {
                    res.redirect('produtos');
                } else {
                    console.log(err);
                    res.render('produtos/erro')
                }
            });
            conn.end();
        }
        //console.log('Recebeu POST');
        //console.log(livro);
        //res.render('produtos/lista');
    });
};