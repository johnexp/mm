var express = require('express');
var guard = require('express-jwt-permissions')();
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload/files/pagina');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage });

var PaginaController = require('../controllers/pagina.controller');

// Map each API to the Controller Functions
router.get('/pagina/:pagina', guard.check('planos-por-adesao:visualizar'), PaginaController.getByPagina);
router.post('/', guard.check('planos-por-adesao:cadastrar'), PaginaController.createPagina);
router.put('/', guard.check('planos-por-adesao:editar'), PaginaController.updatePagina);
router.post('/upload-image', guard.check('planos-por-adesao:cadastrar'), upload.single('file'), PaginaController.uploadImage);
router.delete('/delete-image', guard.check('planos-por-adesao:cadastrar'), PaginaController.deleteImage);

module.exports = router;