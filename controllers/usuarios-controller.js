'use strict';

const mysql = require('../src/sql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.cadastro = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };

        conn.query('SELECT * FROM usuarios where email = ?', [req.body.email], (error, results) => {
            if (error) { return res.status(500).send({ error: error }) };
            if (results.length > 0) {
                res.status(409).send({ message: 'Esse email já foi cadastrado!' })
            } else {

                if (!req.body.email.match("@") || !req.body.email.toLowerCase().match(".com")) {
                    return res.status(401).send({ message: 'Email inválido.' });
                }

                bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
                    if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) };
                    conn.query(
                        'INSERT INTO usuarios(email, senha) values (?, ?);',
                        [req.body.email, hash],
                        (error, resultado, field) => {
                            conn.release();
                            if (error) { return res.status(500).send({ error: error }) }

                            const token = jwt.sign({
                                id: resultado.insertId,
                            },
                                process.env.JWT_KEY, {
                                expiresIn: "30m"
                            });

                            res.status(201).send({
                                idNf: resultado.insertId,
                                mensagem: "Cadastro Criado",
                                token
                            });

                        }
                    )
                });
            }
        });
    });
}

exports.login = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };

        conn.query('SELECT * FROM usuarios WHERE email = ?',
            [req.body.email],
            (error, results, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) };
                if (results.length < 1) {
                    return res.status(401).send({ message: 'Falha na autenticação.' })
                }
                bcrypt.compare(req.body.password, results[0].senha, (err, result) => {
                    if (err) {
                        return res.status(401).send({ message: 'Falha na autenticação.' });
                    }

                    if (result) {
                        if (!results[0].confirmacaoEmail) {
                            const token = jwt.sign({
                                id: results[0].id_usuario,
                            },
                                process.env.JWT_KEY, {
                                expiresIn: "30m"
                            });

                            return res.status(200).send({
                                message: 'Email não confirmado',
                                token
                            });
                        }
                        
                        const token = jwt.sign({
                            id_usuario: results[0].id_usuario,
                            email: results[0].email,
                        },
                            process.env.JWT_KEY, {
                            expiresIn: "30m"
                        });

                        return res.status(200).send({
                            message: 'Autenticado com sucesso!',
                            token
                        });
                    }
                    return res.status(401).send({ message: 'Falha na autenticação.' })
                });

            }
        )
    })
}