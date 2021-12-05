var mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "doantttn1",
});

db.connect(function (err) {
  console.log("Database is connected successfully!");
});

module.exports = db;
