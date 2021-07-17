const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "pomodoro"
});

module.exports = db;