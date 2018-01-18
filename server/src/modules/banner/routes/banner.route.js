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

var BannerController = require('../controllers/banner.controller');
var fileProperties = [
  { name: 'file' }, 
  { name: 'image' }
]

// Map each API to the Controller Functions
router.post('/filter/*?', guard.check('banner:listar'), BannerController.getBanneres);
router.get('/id/:id', guard.check('banner:visualizar'), BannerController.getBanner);
router.get('/', guard.check('banner:visualizar'), BannerController.getAllBanneres);
router.get('/public', BannerController.getAllBanneres);
router.post('/', guard.check('banner:cadastrar'), upload.fields(fileProperties), BannerController.createBanner);
router.put('/', guard.check('banner:editar'), upload.fields(fileProperties), BannerController.updateBanner);
router.delete('/:id', guard.check('banner:excluir'), BannerController.removeBanner);
router.post('/change-state/:id', guard.check('banner:ativar/inativar'), BannerController.changeBannerState);

module.exports = router;