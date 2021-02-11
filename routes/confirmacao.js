'use strict';

const router = require('express').Router();
const controller = require('../controllers/confirmacao-controller');


router.get('/:token', controller.confirmacao);

module.exports = router;