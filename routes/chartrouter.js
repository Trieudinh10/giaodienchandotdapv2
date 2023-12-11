const express = require('express');
const router  = express.Router();

const chartController = require('../app/controllers/chartController');

router.use('/', chartController.index);

module.exports = router;
