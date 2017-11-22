var express = require('express')

var router = express.Router()

// Getting the Sasc Controller that we just created

var SascController = require('../../controllers/sascs.controller');


// Map each API to the Controller FUnctions

router.get('/', SascController.getSascs)

router.post('/', SascController.createSasc)

router.put('/', SascController.updateSasc)

router.delete('/:id',SascController.removeSasc)


// Export the Router

module.exports = router;