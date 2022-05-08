let router = require('express').Router();
let connection = require('../database/conn');
let queries = require('../database/queries/page4');
const { isLoggedIn } = require('../lib/auth');


router.get('/page41',isLoggedIn,(req,res)=>{

    connection.query(queries.listNist, (err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.render('page4/page41',{question: result});
        }
    })
});

router.get('/page42',isLoggedIn,(req,res)=>{

    res.render('page4/page42');

});


// connection.query(queries.listNist + '; '+ queries.list, [1,2],(err, result)=>{
//     res.render('templates/question',{question: result[0] , question2 : result[1]});

router.get('/page43',isLoggedIn, (req, res)=>{
    connection.query(queries.list+ '; '+ queries.user, (err, result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result[1])
            res.render('page4/page43',{question: result[0] , list: result[1]});
            
        }
    })
});

router.get('/user1',isLoggedIn, (req, res)=>{
    connection.query(queries.list1,req.user.fullname, (err, result)=>{
        if(err){
            console.log(err)
        }else{

            res.render('page4/user',{question: result});
        }
    })
});

// router.get('/user2',isLoggedIn, (req, res)=>{
//     connection.query(queries.list,req.user.fullname,  (err, result)=>{
//         if(err){
//             console.log(err)
//         }else{
//             res.render('page4/user2',{question: result});
//         }
//     })
// });

// router.get('/user3',isLoggedIn, (req, res)=>{
//     connection.query(queries.list,req.user.fullname,  (err, result)=>{
//         if(err){
//             console.log(err)
//         }else{
//             res.render('page4/user3',{question: result});
//         }
//     })
// });


module.exports = router ; 