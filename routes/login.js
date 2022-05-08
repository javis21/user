

let router = require('express').Router();
let connection = require('../database/conn');
let queries = require('../database/queries/question');
const { isLoggedIn } = require('../lib/auth');
// const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

// -----
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const multer = require('multer')
const path = require('path')
const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");


router.get('/list',isLoggedIn, (req, res)=>{
    connection.query(queries.list,       (err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.render('templates/question',{question: result});
        }
    })
});




router.get('/edit/:id',isLoggedIn, (req, res)=>{
    connection.query(queries.question(req.params.id),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.render('templates/edit',{question: result});
        }
    })
});

router.post('/edit/:id',isLoggedIn, (req, res)=>{
    // idname: req.params.idname,
    let data={                      

        id: req.params.id,
        main_question: req.body.main_question,
        sub_question: req.body.sub_question,
        question: req.body.question,
        question_num: req.body.question_num,

        category: req.body.category

        
    }

    connection.query(queries.edit(data),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/question/list')
        }
    })
});


router.get('/delete/:id',isLoggedIn, (req, res)=>{
    connection.query(queries.delete(req.params.id),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/question/list')
        }
    })
});

router.get('/add',isLoggedIn, (req, res)=>{
    res.render('templates/add');
});


router.post('/add',isLoggedIn, (req, res)=>{

    let data={ 
       
        id: req.body.id,
        main_question: req.body.main_question,
        sub_question: req.body.sub_question,

        question: req.body.question,
        question_num: req.body.question_num,

        category: req.body.category,

    }

    connection.query(queries.add(data),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/question/list')
        }
    })
})
// ------------

// ---------requiement-------

app.use(express.static("./public"))
// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))




//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './routes/uploads/')    
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage
});
// upload csv to database
router.post('/upload', upload.single("uploadfile"), (req, res) =>{
    UploadCsvDataToMySQL(__dirname + '/uploads/' + req.file.filename);
    console.log('CSV file data has been uploaded in mysql database ' );
});
// -----------insert into sql----------

function UploadCsvDataToMySQL(filePath){
let stream = fs.createReadStream(filePath);
let csvData = [];





let csvStream = 
fastcsv.parse().on("data", function(data) {
  csvData.push(data); })
  .on("end", function() { csvData.shift();
    connection.connect(error => {    
        
        

      let query =  "INSERT INTO questions (id, main_question, sub_question, question , question_num, category) VALUES ?";
        connection.query(query, [csvData], (error, response) => {
          console.log(error || response); });
      
    });
  });

  stream.pipe(csvStream); 

}






module.exports =router;