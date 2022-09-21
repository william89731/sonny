const express = require("express");
require('dotenv').config({ path: '/bot/.env' });
const mysql = require("mysql2");
const app = express();
/*const connection = mysql.createConnection({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "pass",
    database: process.env.MYSQL_DATABASE || "test",
  }); */ 

app.listen(5000, () => console.log("listining on port 5000")); 