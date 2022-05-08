let router = require('express').Router();
let connection = require('../database/conn');
let queries = require('../database/queries/page1');
const { isLoggedIn } = require('../lib/auth');


    router.get('/',isLoggedIn, (req, res)=>{
        connection.query(queries.list, (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.render('page1',{test: result});
            }
        })
    });

    module.exports =router;