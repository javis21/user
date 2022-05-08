const express = require("express");
const { isLoggedIn } = require('../lib/auth');

const router = express.Router();

router.get('/page2',isLoggedIn,(req,res)=>{

    res.render('index');

})


module.exports = router ; 