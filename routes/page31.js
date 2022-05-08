const express = require("express");
const { isLoggedIn } = require('../lib/auth');

const router = express.Router();

router.get('/page31',isLoggedIn,(req,res)=>{

    res.render('page31');

})


module.exports = router ; 