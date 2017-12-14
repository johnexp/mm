var express = require('express');
var router = express.Router();
var guard = require('express-jwt-permissions')();

var ActionController = require('../controllers/action.controller');
var RoleValidation = require('../../../routes/role-validation');

// Map each API to the Controller Functions
router.post('/filter/*?', RoleValidation.validateRole, guard.check('action:listar'), ActionController.getActiones);
router.get('/id/:id', RoleValidation.validateRole, guard.check('action:visualizar'), ActionController.getAction);
router.get('/:actives?', RoleValidation.validateRole, guard.check('action:listar'), ActionController.getAllActiones);
router.post('/', RoleValidation.validateRole, guard.check('action:cadastrar'), ActionController.createAction);
router.put('/', RoleValidation.validateRole, guard.check('action:editar'), ActionController.updateAction);
router.delete('/:id', RoleValidation.validateRole, guard.check('action:ativar/inativar'), ActionController.removeAction);


module.exports = router;