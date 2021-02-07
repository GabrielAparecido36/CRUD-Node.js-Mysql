'use strict';

const mysql = require('mysql2');

const pool = mysql.createPool({
    "user":"root",
    "password":"root",
    "database":"mercado",
    "host":"localhost",
    "port":"3306"
});

//Variáveis de ambiente para produção
// const pool = mysql.createPool({
//     "user": process.env.mysql_user,
//     "password":process.env.mysql_password,
//     "database":process.env.mysql_database,
//     "host":process.env.mysql_host,
//     "port":process.env.mysql_port
// });

module.exports = pool;