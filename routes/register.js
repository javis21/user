let router = require('express').Router();
let connection = require('../database/conn');
let queries = require('../database/queries/register');


router.get('/', (req, res)=>{
    res.render('templates/register');
});


router.post('/', (req, res)=>{

    let data={
       
        nom: req.body.nom,
        email: req.body.email,
        password: req.body.password,
    }

    connection.query(queries.add(data),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/login')
        }
    })
})







module.exports =router;