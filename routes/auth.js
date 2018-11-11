const express = require('express');

const router = express.Router();
const authMiddleware = require('../middleware/auth');
const authController = require('../controllers/auth');

router.get('/login', authController.login);
router.get('/login', authController.login);
router.post('/signin', authMiddleware, authController.signIn);

module.exports = router;
