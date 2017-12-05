var express = require('express');
var router = express.Router();

var SobreController = require('../controllers/sobre.controller');

// Map each API to the Controller Functions
router.get('/public/', SobreController.getSobre);
router.get('/', SobreController.getSobre);
router.post('/', SobreController.createSobre);
router.put('/', SobreController.updateSobre);

module.exports = router;