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

var ParceiroController = require('../controllers/parceiro.controller');
var fileProperties = [
  { name: 'file' }, 
  { name: 'image' }
]

// Map each API to the Controller Functions
router.post('/filter/*?', guard.check('parceiro:listar'), ParceiroController.getParceiros);
router.get('/id/:id', guard.check('parceiro:visualizar'), ParceiroController.getParceiro);
router.get('/enum/:field', guard.check('parceiro:visualizar'), ParceiroController.getEnumValue);
router.get('/public/:tipoParceiro', ParceiroController.getByTipo);
router.get('/:actives?', guard.check('parceiro:visualizar'), ParceiroController.getAllParceiros);
router.post('/', guard.check('parceiro:cadastrar'), upload.fields(fileProperties), ParceiroController.createParceiro);
router.put('/', guard.check('parceiro:editar'), upload.fields(fileProperties), ParceiroController.updateParceiro);
router.delete('/:id', guard.check('parceiro:ativar/inativar'), ParceiroController.removeParceiro);

module.exports = router;