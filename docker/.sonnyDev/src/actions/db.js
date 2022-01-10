const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const Sequelize = require('sequelize');
const dbPath = path.resolve(process.resourcesPath, '/bot/db')
const dbFile = path.resolve(dbPath, '/bot/db/user.db')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbFile
})




  /*    let sql = `
        CREATE TABLE membri (
        user_name TEXT NOT NULL,  
        user_id INTEGER PRIMARY KEY,
        strike INT AUTO_INCREMENT
      );
      `; */ 
        

  //  let sql = `CREATE TABLE  users (user_id INT AUTO_INCREMENT PRIMARY KEY,
  //     user_name VARCHAR(255) NOT NULL,
  //      warn INT);
 //   `; 
let sql = `

          INSERT INTO membri (user_name, user_id, strike)
          VALUES('pippo baudo','123456789','2');
          `; 
  //  let sql = `DROP TABLE users`;                    
    
    db.all(sql, (err) => {
    console.log(err);  
      if (err) {
        throw err;
      }
      
    }); 

 /*   db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Close the database connection.');
      }); */
      



