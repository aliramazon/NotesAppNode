const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/me', authController.isAuthenticated, userController.getMe);
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/logout', authController.logout);

module.exports = router;
