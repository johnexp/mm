var express = require('express');
var router = express.Router();

var PermissionController = require('../controllers/permission.controller');

// Map each API to the Controller Functions
router.post('/filter/*?', PermissionController.getPermissiones);
router.get('/id/:id', PermissionController.getPermission);
router.get('/:actives?', PermissionController.getAllPermissiones);
router.post('/', PermissionController.createPermission);
router.put('/', PermissionController.updatePermission);
router.delete('/:id', PermissionController.removePermission);

module.exports = router;