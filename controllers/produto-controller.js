'use strict';

const mysql = require('../src/sql');

exports.get = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "SELECT * FROM produtos",
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({ response: resultado })
            }
        )
    });
};

exports.getId = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "SELECT * FROM produtos where id = ?",
            [req.params.id],
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({ response: resultado })
            }
        )
    });
};

exports.post =  (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'insert into produtos(nomeProduto, categoria, codEan, preco) values (?, ?, ?, ?);',
            [req.body.nomeProduto, req.body.categoria, req.body.codEan, req.body.preco],
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                res.status(201).send({
                    idNf: resultado.insertId,
                    mensagem: "Produto inserido"
                });
            }
        )
    });
};

exports.put =  (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE produtos
                set nomeProduto = ?,
                categoria= ?,
                codEan = ?,
                preco = ?
            where id = ?`,

            [req.body.nomeProduto,
            req.body.categoria,
            req.body.codEan,
            req.body.preco,
            req.params.id],
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                res.status(201).send({
                    mensagem: "Produto Atualizado",
                });
            }
        )

    });
};

exports.delete =  (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "DELETE FROM produtos WHERE id = ?",
            [req.params.id],
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                console.log(resultado)
                return res.status(200).send({ mensagem: "Produto deletado com sucesso!" })
            }
        )
    });


};

