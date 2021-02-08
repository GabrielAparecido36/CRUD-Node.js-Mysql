'use strict';

const router = require('express').Router();
const controller = require('../controllers/usuarios-controller');

router.post('/cadastro', controller.cadastro);

router.post('/login', controller.login);


module.exports = router;