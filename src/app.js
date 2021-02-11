'use strict';

const express = require('express');
const app = express();
const router = express.Router();

const produtosRoute = require('../routes/produtos');
const usuariosRoute = require('../routes/usuarios');
const confirmacaoRoute = require('../routes/confirmacao');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/uploads', express.static('uploads'));

app.use('/produtos', produtosRoute);
app.use('/usuarios', usuariosRoute);
app.use('/confirmacao', confirmacaoRoute);

//Controlador de acesso
//Mudar o * para os origins corretos

app.use((req, res, next) => {
    res.header(`Acess-Control-Allow-Origin`, `*`)
    res.header('Acess-Control-Allow-Header',
     'Origin, X-Requested-With, Content-Type, Accept, Authorization');

     //Desenvolvimento
     if(req.method === `OPTIONS`){
         res.header('Acess-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
         return res.status(200).send({});
     }

     next();
})

//Tratamento de erros básicos
//Manter status = 200 por segurança

app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada.');
    erro.status = 400;
    next(erro);
});

app.use((error, req, res, next) => {

    res.status(error.status || 500 );
    return res.send({
        erro: {
            messagem: error.message
        }
    });

});


module.exports = app;
