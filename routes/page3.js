const express = require("express");
const { isLoggedIn } = require('../lib/auth');

const router = express.Router();

router.get('/page3',isLoggedIn,(req,res)=>{

    res.render('page3');

})


module.exports = router ; 