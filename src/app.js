'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const produtosRoute = require('../routes/produtos');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/produtos', produtosRoute);

//Controlador de acesso
app.use((req, res, next) => {
    res.header(`Acess-Control-Allow-Origin`, `*`)
    res.header('Acess-Control-Allow-Header',
     'Origin, X-Requested-With, Content-Type, Accept, Authorization');

     if(req.method === `OPTIONS`){
         res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
         return res.status(200).send({});
     }
     next();
})

//Tratamento de erros básicos
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
