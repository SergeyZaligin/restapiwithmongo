const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.get('/login', authController.login);
router.get('/registration', authController.registration);

module.exports = router;
