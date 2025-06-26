const express = require('express');
const router = express.Router();
const { addStore, findNearestStore } = require('../Controllers/storeController');

router.post('/stores', addStore);
router.post('/stores/nearest', findNearestStore);

module.exports = router;
