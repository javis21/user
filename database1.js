var mysql = require('mysql');
var conn = mysql.createConnection({
  host: process.env.DATABASE_HOST, 
  user: process.env.DATABASE_USER,      
  password: process.env.DATABASE_PASSWORD,  
  database: process.env.DATABASE// 
}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;
