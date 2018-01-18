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

var ProdutoServicoController = require('../controllers/produto-servico.controller');
var fileProperties = [
  { name: 'file' }, 
  { name: 'image' }
]

// Map each API to the Controller Functions
router.post('/filter/*?', guard.check('produto-servico:listar'), ProdutoServicoController.getProdutoServico);
router.get('/id/:id', guard.check('produto-servico:visualizar'), ProdutoServicoController.getProdutoServico);
router.get('/:actives?', guard.check('produto-servico:visualizar'), ProdutoServicoController.getAllProdutoServico);
router.post('/', guard.check('produto-servico:cadastrar'), upload.fields(fileProperties), ProdutoServicoController.createProdutoServico);
router.put('/', guard.check('produto-servico:editar'), upload.fields(fileProperties), ProdutoServicoController.updateProdutoServico);
router.delete('/:id', guard.check('produto-servico:ativar/inativar'), ProdutoServicoController.removeProdutoServico);

module.exports = router;