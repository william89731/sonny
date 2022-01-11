const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
require('dotenv').config({ path: '/bot/.env' });
const express = require("express");
const mysql = require("mysql2");
const app = express();
App.bot.command(`unstrike`,  function(msg) {
  msg.deleteMessage();
  console.log("comando unstrike eseguito");
  chatId = msg.chat.id;
  messageId = msg.message_id;
  fromId = msg.from.id;
  replyId = msg.message.reply_to_message.from.id;
  replyName = msg.message.reply_to_message.from.first_name;
  fromName = msg.from.first_name;
  testo = msg.update.message ;
  App.bot.telegram.getChatMember(chatId, fromId).then(function(data){
            if ((data.status == 'creator') || (data.status == 'administrator')){
                console.log(`l'utente e' un ${data.status}` );
                App.bot.telegram.getChatMember(chatId, replyId).then(function(result){
                console.log(`l'utente da togliere ha id:'${replyId}'`);
                let con = mysql.createConnection({
                connectionLimit: 10,
                host: process.env.MYSQL_HOST ,
                user: process.env.MYSQL_USER ,
                password: process.env.MYSQL_ROOT_PASSWORD ,
                database: process.env.MYSQL_DATABASE ,
                });
                con.connect(function(err) {
                    if (err) throw err;
                    con.query(`DELETE FROM membri  WHERE  user_id = ${replyId}`, function(err,result) {
                    if (err) throw err;
                    console.log(`utente tolto dalla lista`);
                        msg.reply(`${replyName}, <em>\nsei stato tolto dalla lista ☺️</em>`,{ parse_mode: "html"});
                    });   
                }) // 
            })
        }
    }) 
}); 