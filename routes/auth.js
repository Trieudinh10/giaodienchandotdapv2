const express = require('express');
const router = express.Router();

const authController = require("../app/controllers/authController")
const middlewareController = require('../app/controllers/middlewareController');

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/refresh", authController.requestRefreshToken);
router.post("/logout",middlewareController.verifyToken, authController.userLogout); // thêm middleware để đăng xuất khi có đăng nhập

router.use('/', authController.index);

module.exports = router;