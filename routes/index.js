const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');



// const express = require('express');
// const router = express.Router();
// const { isLoggedIn } = require('../lib/auth');
let connection = require('../database/conn');
let queries = require('../database/queries/user');


router.get('/',isLoggedIn, (req, res) => {


    res.render('auth/signin.hbs');
  
});

// router.get('/',isLoggedIn, (req, res) => {
//   res.render('auth/signin.hbs');
// });


router.post('/', function (req, res) {


    //login validations
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
  
    req.getValidationResult().then(function (result) {
      if (!result.isEmpty()) {
        res.render('index1', {
          title: 'Login Panel',
          message: '',
          message_type: '',
          errors: result.array(),
          user: req.session.loggedUser,
        });
  
      } else {
        var user = {
          username: req.body.username,
          password: req.body.password,
          admin: ''
        }
  
        var query = "SELECT * FROM pros WHERE username = ? AND password = ?";
        db.getData(query, [user.username, user.password], function (rows) {
          console.log(rows[0]);
          if (!rows[0]) {
            res.render('view_login', {
              title: 'User Login',
              message: 'Login Failed! Enter Correct Infromatins.',
              message_type: 'alert-danger',
              errors: ''
            });
          } else {
            if (rows[0].admin == '0') {
  
              user.UserType = 'admin';
              req.session.loggedUser = user;
  
              res.redirect('/index1');
  
            } else if (rows[0].Usertype == 'Staff') {
  
              user.UserType = 'Staff';
              req.session.loggedUser = user;
  
              res.redirect('/index1');
  
            }
          }
        });
  
      } // validation end
  
    });
  
  });


module.exports = router;