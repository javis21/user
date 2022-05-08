let mysql = require('mysql');
let cnx = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'task4',
    multipleStatements: true
})

cnx.connect(err=>{
    if(!err) {
        console.log(`Database connection successfull`);
    }else{
        console.log(`An error has ocurred: ${err}`);
    }
})

module.exports = cnx;