'use strict';

const mysql = require('../src/sql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.confirmacao = (req, res, next) => {
    try {
        const id = jwt.verify(req.params.token, process.env.JWT_KEY).id;
        mysql.getConnection((error, conn) => {
            conn.query(`UPDATE usuarios set confirmacaoEmail = true where id_usuario = ?`,
                [id],
                (error, resultado, field) => {
                    conn.release();
                    if (error) { return res.status(500).send({ error: error }) }
                    res.status(201).send({
                        mensagem: "Email confirmado!",
                    });
                }
            )
        });
    } catch {
        res.status(401).send({
            mensagem: "Email não confirmado!",
        });
    }
};
