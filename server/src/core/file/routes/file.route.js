var express = require('express');
var guard = require('express-jwt-permissions')();
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload/files/rt-editor-images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage });

// Map each API to the Controller Functions
router.post('/upload-image', upload.single('file'), function (req, res) {
  return res.status(200).json({ 'link': '/public/upload/files/rt-editor-images/' + req.file.filename });
});
router.delete('/delete-image', function (req, res) {
  return res.status(200).json({ 'link': '/public/upload/files/rt-editor-images/' + req.file.filename });
});

module.exports = router;