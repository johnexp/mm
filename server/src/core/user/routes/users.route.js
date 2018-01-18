var express = require('express');
var router = express.Router();
var guard = require('express-jwt-permissions')();

// Getting the Versao Controller that we just created
var UserController = require('../controllers/user.controller');
var RoleValidation = require('../../../../routes/role-validation')();

// routes
router.post('/authenticate', UserController.authenticate);
router.post('/register', UserController.register);
router.post('/filter/*?', RoleValidation.validateRole, UserController.getUsers);
router.get('/', RoleValidation.validateRole, UserController.getAllUsers);
router.get('/id/:id', RoleValidation.validateRole, UserController.getUser);
router.get('/current', UserController.getCurrent);
router.put('/:id', RoleValidation.validateRole, UserController.updateUser);
router.put('/self/:id', UserController.updateSelf);
router.delete('/:id', RoleValidation.validateRole, UserController.removeUser);

module.exports = router;
