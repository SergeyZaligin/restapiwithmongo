const express = require('express');

const router = express.Router();
const authMiddleware = require('../middleware/auth');
const authController = require('../controllers/auth');

router.post('/signin', authController.signIn);
router.post('/refresh-tokens', authController.refreshTokens);

module.exports = router;
