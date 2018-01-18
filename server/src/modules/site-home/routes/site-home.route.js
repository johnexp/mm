var express = require('express');
var router = express.Router();

var SiteHomeController = require('../controllers/site-home.controller');

// Map each API to the Controller Functions
router.get('/public', SiteHomeController.getConteudoHome);

module.exports = router;