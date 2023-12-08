const express = require('express');
const router = express.Router();

const table1Controller = require('../app/controllers/table1Controller')

router.use('/', table1Controller.index)


module.exports = router;