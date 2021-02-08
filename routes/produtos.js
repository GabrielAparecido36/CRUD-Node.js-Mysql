'use strict';

const router = require('express').Router();
const controller = require('../controllers/produto-controller');
const login = require('../middleware/loginMW')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname );
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
       return cb(null, true);
    }
    return cb(null, false);
};

const upload = multer({ 
    storage: storage,
    limits:{
        fieldSize: 1024 * 1024* 5
    },
    fileFilter
});

router.get('/', controller.get);

router.get('/:id', controller.getId);

router.post('/', upload.single('file'), login, controller.post);

router.put('/:id',  upload.single('file'), login, controller.put);

router.delete('/:id', login, controller.delete);

module.exports = router;