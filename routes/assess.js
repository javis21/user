

const express = require("express");
const authController = require('../controllers/assess');
const { isLoggedIn } = require('../lib/auth');


const router = express.Router();

router.post('/register',isLoggedIn,authController.register)


module.exports = router ; 