const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});

exports.register = (req,res ) => {
  


const answer=req.body;


// db.query('INSERT INTO answer SET ?',answer,(error,results)=>{

    
        const list= `SELECT num FROM answer    ORDER BY ID DESC LIMIT 3   `;

   
    var num='SELECT num from answer ORDER BY ID DESC LIMIT 1';
    db.query(num, function (err, dat, fields) {
     
       
       
         console.log(dat[0].num);
    
    num =dat[0].num ;
    num ++;

console.log(num);
console.log(list);
// console.log(dat);

 // answer vars 
 var nan = 0 ;
 var ya =0 ;

 var na = 0 ;

    for (var key of Object.keys(answer)) {
        // counter to  q = answer[key][1]
       

        // getting objects from body
       p = answer[key][0]
       q = answer[key][1]
       comment = answer[key][2]
        file = answer[key][3]
        console.log(p)
        if(p== "idk"){
            nan++
          
        }
        if(p== "no"){
            na++
          
        }
        if(p== "yes"){
            ya++
          
        }
    
    db.query('INSERT INTO answer SET ?', {num:num , q1:key , q2:p ,q3:q , comment:comment , file:file });
    }
    db.query('INSERT INTO ans SET ?',{yess:ya , noo: na  , idkk: nan});

console.log(nan)
console.log(ya)
console.log(na)
let data={
    yess : ya,
    noo : na ,
    idk : nan
    
}
console.log(data)
res.render('page5', {  data: data});
});
// var sql='SELECT yess,noo,idkk FROM ans ORDER BY ID DESC LIMIT 1';


 




}

