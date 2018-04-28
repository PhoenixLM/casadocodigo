module.exports = (app) => {
    app.get('/promocoes/form', (req, res) => {
        const conn = app.infra.connectionfactory();
        const produtoDao = new app.infra.ProdutoDao(conn);

        produtoDao.lista((err, results) => {
            res.render('promocoes/form', {lista:results});
        });
    });

    app.post('/promocoes', (req, res) => {
        const promocao = req.body;

        app.get('io').emit('novaPromocao', promocao);
        res.redirect('/promocoes/form');
    })
}