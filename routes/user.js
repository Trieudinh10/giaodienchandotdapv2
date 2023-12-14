const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyMiddleware = require('../middleware/verifyMiddleware');

router.get("/",  userController.getAllUsers);
router.delete("/:id", verifyMiddleware.verifyTokenAndAdminAuth, userController.deleteUser);

module.exports = router;