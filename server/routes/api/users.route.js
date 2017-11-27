var express = require('express');
var router = express.Router();

// Getting the Versao Controller that we just created
var UserController = require('../../controllers/user.controller');

// routes
router.post('/authenticate', UserController.authenticate);
router.post('/register', UserController.register);
router.get('/', UserController.getAllUsers);
router.get('/current', UserController.getCurrent);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.removeUser);

module.exports = router;
