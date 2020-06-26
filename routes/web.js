const http = require("http");
const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index.js");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authenticatedMiddleware = require("../middlewares/authenticatedMiddleware");
const signupController = require("../controllers/authentication/signup");

router.get("/", guestMiddleware, indexController.indexPage);
router.get("/signup", guestMiddleware, signupController.registerPage);

module.exports = router;