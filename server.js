const app = require('./custom-express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('io', io);

const server = http.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Servidor executando em http://%s:%s', host, port);
});

/*
app.listen(3000, function(){
    console.log('Servidor rodando na porta 3000');
});
*/