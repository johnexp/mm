var express = require('express');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload/arquivos');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage });
var router = express.Router();

var ArquivoController = require('../controllers/arquivo.controller');

// Map each API to the Controller Functions
router.post('/filter/*?', ArquivoController.getArquivos);
router.get('/public/id/:id', ArquivoController.getArquivo);
router.get('/id/:id', ArquivoController.getArquivo);
router.get('/public', ArquivoController.getAllArquivos);
router.get('/', ArquivoController.getAllArquivos);
router.post('/', upload.single('file'), ArquivoController.createArquivo);
router.put('/', upload.single('file'), ArquivoController.updateArquivo);
router.delete('/:id', ArquivoController.removeArquivo);

module.exports = router;