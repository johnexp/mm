const express = require('express');
const router = express.Router();

const ContatoController = require('../controllers/contato.controller');

// Map each API to the Controller Functions
router.post('/public', ContatoController.sendContactMail);

module.exports = router;