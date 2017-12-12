var express = require('express');
var router = express.Router();

var ActionController = require('../controllers/action.controller');

// Map each API to the Controller Functions
router.post('/filter/*?', ActionController.getActiones);
router.get('/id/:id', ActionController.getAction);
router.get('/:actives?', ActionController.getAllActiones);
router.post('/', ActionController.createAction);
router.put('/', ActionController.updateAction);
router.delete('/:id', ActionController.removeAction);

module.exports = router;