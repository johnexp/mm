var express = require('express');
var router = express.Router();

var ActionController = require('../controllers/action.controller');
var RoleValidation = require('../../../routes/role-validation');

// Map each API to the Controller Functions
router.post('/filter/*?', RoleValidation.validateRole, ActionController.getActiones);
router.get('/id/:id', RoleValidation.validateRole, ActionController.getAction);
router.get('/:actives?', RoleValidation.validateRole, ActionController.getAllActiones);
router.post('/', RoleValidation.validateRole, ActionController.createAction);
router.put('/', RoleValidation.validateRole, ActionController.updateAction);
router.delete('/:id', RoleValidation.validateRole, ActionController.removeAction);


module.exports = router;