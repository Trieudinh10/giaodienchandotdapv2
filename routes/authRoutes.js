const { Router } = require('express');
const authController = require('../controllers/authController');
// const model = require('../models/userlocal');

const router = Router();
router.get('/signup', authController.getCreatePage);
// router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
// router.post('/login', authController.login_post);
// router.get('/logout', authController.logout_get);

// router.get('/signup', model.getCreatePage);
router.post('/signup', authController.postCreateuser);
module.exports = router;