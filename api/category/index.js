const express = require('express');

const router = express.Router();
const controller = require('./controller');

router.get('/',controller.getUrl);
router.post('/postUrl',controller.postUrl);
router.get('/update/:id',controller.getUpdate)
router.post('/updated/:id',controller.updated)
router.get('/delete/:id',controller.delete)

module.exports = router;
