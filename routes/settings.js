const express = require("express");
const { isLoggedIn } = require('../lib/auth');

// let router = require('express').Router();
let connection = require('../database/conn');
let queries = require('../database/queries/profile');
const router = express.Router();
const bcrypt = require('bcryptjs');



const passport = require('../lib/passport');
const LocalStrategy = require('passport-local').Strategy;
const helpers = require('../lib/helpers');

router.get('/settings',isLoggedIn,(req,res)=>{

    // res.render('profile/settings');
    var sql = "SELECT * FROM pros WHERE id=?";
console.log(req.user.id);
    // connection.query(sql,req.user.id,function( result){
      
    //         res.render('profile/settings',{profile: result});
        
    // })
    const  ID  =req.user.id;
 

    connection.query("SELECT * FROM pros WHERE id = ?",[ID], function (err, data, fields) {
        if (err) throw err;
        // req.app.locals.layout = 'base'; 
    

        res.render('profile/settings', {  data: data});
    
      });
     
    
    // const { ID } =req.user.id;
    // const link =  connection.query('SELECT username FROM pros WHERE id = 18');
    // console.log(link);

    // res.render('profile/settings', {link: link});
});

router.get('/settings/edit',isLoggedIn,(req,res)=>{
    const  ID  =req.user.id;
 

    connection.query("SELECT * FROM pros WHERE id = ?",[ID], function (err, data, fields) {
        if (err) throw err;
        // req.app.locals.layout = 'base'; 
    

        res.render('profile/edit', {  data: data});
    
      });


})


router.post('/settings/edit', (req, res)=> {
    // var rules = validationRules.users.update;
    // var validator = new asyncValidator(rules);
    // const  ID  =req.user.id;
    var data = {
      user_id: req.body.user_id,
      fullname: req.body.name,
      mail: req.body.email,
      phone: req.body.phone,
      adress: req.body.address,
     
    };
    // var sql = "UPDATE users SET name = ?, email = ?, phone = ?, address = ?, gender = ? WHERE user_id = ?";
    // db.executeQuery(sql, [user.name, user.email, user.phone, user.address, user.gender, user.user_id],
        
        connection.query("UPDATE pros SET fullname = ?, mail = ?, phone = ?, adress = ? WHERE id = ?",[ data.fullname , data.mail ,data.phone, data.adress,data.user_id], function (err, data, fields) {
            if (err) throw err;
            // req.app.locals.layout = 'base'; 
        
    
            res.redirect('/settings');
        
          });
    
    
});
router.get('/settings/password',isLoggedIn,(req,res)=>{
    

        res.render('profile/password');
    
     


});


router.post('/settings/password',isLoggedIn,(req,res)=>{
    const  ID  =req.user.id;
 
    var file = {
        pass: req.body.oldPassword,
        new: req.body.newPassword,
        confirm: req.body.confirmPassword,
      
       
      };
    connection.query("SELECT password FROM pros WHERE id = ?",[ID], async (err, data, fields)  =>{
        if (err) throw err;
      
       
    const ValidPassword = await helpers.matchPassword(file.pass,req.user.password);
    console.log(ValidPassword)
    const sPassword = await bcrypt.compare(file.pass,req.user.password);
    console.log(sPassword)
    if(ValidPassword){
           if(file.new == file.confirm  ){

             dbpass = await helpers.encryptPassword(file.new);
            //  const result = await connection.query('UPDATE pros SET password= ? WHERE id = ?', [file.new,req.user.id]);
             connection.query("UPDATE pros SET password= ? WHERE id = ?",[dbpass,req.user.id], function (err, data, fields) {
                if (err) throw err;
                // req.app.locals.layout = 'base'; 
            
        console.log("hello")    
                res.redirect('/settings');
            
              });
           }

    }

        // res.render('profile/password', {  data: data});
    
      });


})

module.exports = router ; 



