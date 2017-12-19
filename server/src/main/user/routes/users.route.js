var express = require('express');
var router = express.Router();
var guard = require('express-jwt-permissions')();

// Getting the Versao Controller that we just created
var UserController = require('../controllers/user.controller');
var RoleValidation = require('../../../../routes/role-validation');

// routes
router.post('/authenticate', UserController.authenticate);
router.post('/register', UserController.register);
router.get('/', RoleValidation.validateRole, guard.check('user:listar'), UserController.getAllUsers);
router.get('/current', UserController.getCurrent);
router.put('/:id', RoleValidation.validateRole, UserController.updateUser);
router.delete('/:id', RoleValidation.validateRole, guard.check('user:ativar/inativar'), UserController.removeUser);

module.exports = router;
