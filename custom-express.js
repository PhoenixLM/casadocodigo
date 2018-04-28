const express = require('express');
const load = require('express-load');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

module.exports = function(){
    const app = express();
    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(expressValidator());
    app.set('view engine', 'ejs');
    load('rotas')
        .then('infra')
        .into(app);
    return app;
}