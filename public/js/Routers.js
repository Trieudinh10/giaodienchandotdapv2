const express = require('express');
var router = express.Router();


router.get('/table_1', function (req, res) {
    res.render('table_1');
})

router.get('/table_2', function (req, res) {
    res.render('table_2');
})

router.get('/chart', function (req, res) {
    res.render('chart');
})

router.get('/data', function (req, res) {
    res.render('data');
})

router.get('/setting', function (req, res) {
    res.render('setting');
})

module.exports = router