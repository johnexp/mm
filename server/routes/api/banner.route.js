var express = require('express');
var router = express.Router();

var BannerController = require('../../controllers/banner.controller');

// Map each API to the Controller Functions
router.post('/filter/*?', BannerController.getBanneres);
router.get('/id/:id', BannerController.getBanner);
router.get('/', BannerController.getAllBanneres);
router.post('/', BannerController.createBanner);
router.put('/', BannerController.updateBanner);
router.delete('/:id', BannerController.removeBanner);

module.exports = router;