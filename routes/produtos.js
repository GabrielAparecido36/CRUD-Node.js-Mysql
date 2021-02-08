'use strict';

const router = require('express').Router();
const controller = require('../controllers/produto-controller');
const login = require('../middleware/loginMW')

router.get('/', controller.get);

router.get('/:id', controller.getId);

router.post('/', login, controller.post);

router.put('/:id', controller.put);

router.delete('/:id', login, controller.delete);

module.exports = router;