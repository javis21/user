const express = require("express");
const { isLoggedIn } = require('../lib/auth');

const router = express.Router();

router.get('/page5',isLoggedIn,(req,res)=>{

    res.render('page5');

})


module.exports = router ; 