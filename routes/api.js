const http = require('http');
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/authentication/signin');
const registerController = require('../controllers/authentication/signup');

router.post("/postRegister",  registerController.postRegister);
router.post("/postLogin", loginController.postLogin);

module.exports = router;