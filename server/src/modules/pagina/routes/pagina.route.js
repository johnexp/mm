var express = require('express');
var router = express.Router();
var PaginaController = require('../controllers/pagina.controller');

// Map each API to the Controller Functions
router.get('/public/:pagina', PaginaController.getByPagina);

module.exports = router;