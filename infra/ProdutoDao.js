function ProdutoDao(connection) {
    this._connection = connection;
}

ProdutoDao.prototype.lista = function(cb) {
    this._connection.query('select * from livros', cb);
}

ProdutoDao.prototype.salva = function(livro, cb) {
    this._connection.query('insert into livros set ?', livro, cb);
}

ProdutoDao.prototype.obtem = function(id, cb) {
    this._connection.query('select * from livros where id=?', [id], cb);
}

module.exports = function() {
    return ProdutoDao;
}