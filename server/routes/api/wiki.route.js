var express = require('express');
var multer = require('multer');
var upload = multer({
  dest: './public/upload/wiki-files',
  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
  }
});
var router = express.Router();

var WikiController = require('../../controllers/wiki.controller');

// Map each API to the Controller Functions
router.post('/filter/*?', WikiController.getWikis);
router.get('/public/id/:id', WikiController.getWiki);
router.get('/id/:id', WikiController.getWiki);
router.get('/public', WikiController.getAllWikis);
router.get('/', WikiController.getAllWikis);
router.post('/', WikiController.createWiki);
router.post('/upload-image', upload.single('file'), WikiController.uploadImage);
router.put('/', WikiController.updateWiki);
router.delete('/:id', WikiController.removeWiki);
router.delete('/delete-image', WikiController.deleteImage);

module.exports = router;