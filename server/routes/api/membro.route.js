var express = require('express');
var router = express.Router();

var MembroController = require('../../controllers/membro.controller');

// Map each API to the Controller Functions
router.post('/filter/*?', MembroController.getMembros);
router.get('/id/:id', MembroController.getMembro);
router.get('/', MembroController.getAllMembros);
router.post('/', MembroController.createMembro);
router.post('/upload-foto', MembroController.salvarFoto);
router.put('/', MembroController.updateMembro);
router.delete('/:id', MembroController.removeMembro);

module.exports = router;