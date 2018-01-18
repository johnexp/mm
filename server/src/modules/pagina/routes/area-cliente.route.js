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
router.get('/pagina/:pagina', guard.check('pagina-area-cliente:visualizar'), PaginaController.getByPagina);
router.post('/', guard.check('pagina-area-cliente:cadastrar'), PaginaController.createPagina);
router.put('/', guard.check('pagina-area-cliente:editar'), PaginaController.updatePagina);
router.post('/upload-image', guard.check('pagina-area-cliente:cadastrar'), upload.single('file'), PaginaController.uploadImage);
router.delete('/delete-image', guard.check('pagina-area-cliente:cadastrar'), PaginaController.deleteImage);

module.exports = router;