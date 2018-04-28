module.exports = (app) => {
    app.get('/', (req, res) => {
        const conn = app.infra.connectionfactory();
        const produtoDAO = new app.infra.ProdutoDao(conn);

        produtoDAO.lista((err, results, flds) => {
            res.render('home/index', {livros:results});
        });
        conn.end();
    });
}