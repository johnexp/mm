var express = require('express');
var guard = require('express-jwt-permissions')();
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload/files');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage });

var TesteController = require('../controllers/teste.controller');
var fileProperties = [
  { name: 'file' }, 
  { name: 'image' }
]

// Map each API to the Controller Functions
router.post('/filter/*?', guard.check('teste:listar'), TesteController.getTestes);
router.get('/id/:id', guard.check('teste:visualizar'), TesteController.getTeste);
router.get('/enum/:field', guard.check('teste:visualizar'), TesteController.getEnumValue);
router.get('/:actives?', guard.check('teste:visualizar'), TesteController.getAllTestes);
router.post('/', guard.check('teste:cadastrar'), upload.fields(fileProperties), TesteController.createTeste);
router.put('/', guard.check('teste:editar'), upload.fields(fileProperties), TesteController.updateTeste);
router.delete('/:id', guard.check('teste:ativar/inativar'), TesteController.removeTeste);

module.exports = router;