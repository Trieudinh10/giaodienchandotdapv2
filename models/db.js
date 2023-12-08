const mysql = require("mysql");

// Khởi tạo SQL
var mysql = require('mysql');

var sqlcon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "sql_login",
  dateStrings:true // Hiển thị không có T và Z
});

sqlcon.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database");
})

module.exports = sqlcon;