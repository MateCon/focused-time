const mysql = require("mysql");

const db = mysql.createConnection({
    host: "us-cdbr-east-04.cleardb.com",
    user: "ba3c525356c0f3",
    password: "c0945f46",
    database: "heroku_f39a3e2c32973da"
});
// mysql://ba3c525356c0f3:c0945f46@us-cdbr-east-04.cleardb.com/heroku_f39a3e2c32973da?reconnect=true
module.exports = db;