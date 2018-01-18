const express = require('express');
const router = express.Router();

const ContactController = require('../controllers/contact.controller');

// Map each API to the Controller Functions
router.post('/public', ContactController.validateContactMail, ContactController.sendContactMail);

module.exports = router;