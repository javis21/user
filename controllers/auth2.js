const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});

exports.register = (req,res ) => {
    console.log(req.body);


    const {sector,industry,protect,effort,org,unit,type} = req.body;


db.query('INSERT INTO demo SET ?',{ sector: sector , industry: industry ,protect : protect ,effort : effort , org: org , unit: unit ,type:type},(error,results)=>{

    if (error){
        console.log(error);

    }else {

        res.redirect('../page3');

    }
})


}

