'use strict';

const router = require('express').Router();
const mysql = require('../src/sql');
const controller = require('../controllers/produto-controller');

router.get('/', controller.get);

router.get('/:id', controller.getId);

router.post('/', controller.post);

router.put('/:id', controller.put);

router.delete('/:id', controller.delete);

module.exports = router;