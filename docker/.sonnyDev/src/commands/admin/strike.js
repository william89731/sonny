const App = require('/bot/src/settings/app');
const tools = require('/bot/src/tools');
const Message = require('/bot/src/message');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
const ms = require('ms');
require('dotenv').config({ path: '/bot/.env' });
const express = require("express");
const mysql = require("mysql2");
const app = express();
var userAlias;

function connection_to_db() {
  let connection = mysql.createConnection({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST  ,
    user: process.env.MYSQL_USER  ,
    password: process.env.MYSQL_ROOT_PASSWORD ,
    database: process.env.MYSQL_DATABASE ,
  });
  return connection;
}
App.bot.command(`strike`,  function(msg) {
  msg.deleteMessage();
  console.log("comando strike eseguito");

  var msg_info = new Message(msg);

  userAlias = tools.getUsernameOrId;

  App.bot.telegram.getChatMember(msg_info.chatId, msg_info.fromId).then(function(data){
    if (tools.isAdmin(App.bot.telegram.getChatMember(msg_info.chatId, msg_info.fromId))) {
      console.log(`l'utente e' un ${data.status}` );
      App.bot.telegram.getChatMember(msg_info.chatId, msg_info.replyId).then(function(result){
        console.log(`l'utente da ammonire ha id: ${msg_info.replyId}`);

        let con = connection_to_db();

        con.connect(function(err) {
          if (err) throw err;
          con.query(`SELECT COUNT(*) as strike FROM membri WHERE  user_id = ${msg_info.replyId}`, function(err,result) {
            if (err) throw err;
            console.log(`${result[0].strike}`);
            if (`${result[0].strike}` === "0" ) {
              console.log (`user not found!`);
              con.query(`INSERT INTO membri ( user_id, user_name, strike ) VALUES ('${msg_info.replyId}','${msg_info.replyName}', 1 )`, function(err,result) {
                if (err) throw err;
                console.log (`utente inserito nella lista`);
              }); 
              con.query(`SELECT strike FROM membri WHERE  user_id='${msg_info.replyId}'`, function(err,result) {
                if (err) throw err;
                console.log(`${result[0].strike}`);
                msg.reply(`❌ ⚾ \n${userAlias}, <em>hai commesso una infrazione!</em> \n ${result[0].strike}/3 <em>strike</em> `,{ parse_mode: "html"});
              }); 

            }
            else { 
              console.log (`user found!`);
              con.query(`UPDATE membri SET strike=strike+1 WHERE user_id='${msg_info.replyId}'`, function(err,result) {
                if (err) throw err;
                console.log (`strike aggiornato`);
              });
              con.query(`SELECT strike FROM membri WHERE  user_id='${msg_info.replyId}'`, function(err,result) {
                if (err) throw err;
                console.log(`${result[0].strike}`);
                if (`${result[0].strike}` == "3"){
                  noperms = {};
                  noperms.can_send_message = false;
                  noperms.can_send_media_messages = false;
                  noperms.can_send_other_messages = false;
                  noperms.can_can_add_web_page_previews = false;
                  App.bot.telegram.restrictChatMember(msg_info.chatId, msg_info.replyId, {until_date: Math.round((Date.now() + ms(1 + 'm'))/1000) }, noperms).then(function(result){
                    msg.reply(`❌ ⚾ \n${userAlias}, <em>Sei arrivato al terzo strike!</em> \n<em>Sei stato mutato per 1 min 🤐</em> `,{ parse_mode: "html"});
                    // App.bot.deleteMessage(chat.id, messageId);
                  }) // restrictChatMember
                  con.query(`DELETE FROM membri  WHERE  user_id = ${msg_info.replyId}`, function(err,result) {
                    if (err) throw err;
                    console.log(`utente  tolto dalla lista`);
                  });   
                }
                else{
                  msg.reply(`❌ ⚾ \n${userAlias}, <em>hai commesso una infrazione!</em> \n ${result[0].strike}/3 <em>strike</em> `,{ parse_mode: "html"});  
                }  
              });  
            }
          })

        })
      }) ///
    }//creator or admin
  }) //get member
}); //command

App.bot.command(`unstrike`,  function(msg) {
  msg.deleteMessage();
  console.log("comando unstrike eseguito");
  var msg_info = new Message(msg);

  userAlias = tools.getUsernameOrId;

  App.bot.telegram.getChatMember(msg_info.chatId, msg_info.fromId).then(function(data){
    if (tools.isAdmin(App.bot.telegram.getChatMember(msg_info.chatId, msg_info.fromId))) {
      console.log(`l'utente e' un ${data.status}` );
      App.bot.telegram.getChatMember(msg_info.chatId, msg_info.replyId).then(function(result){
        console.log(`l'utente da togliere ha id:'${msg_info.replyId}'`);

        let con = connection_to_db();

        con.connect(function(err) {
          if (err) throw err;
          con.query(`DELETE FROM membri  WHERE  user_id = ${msg_info.replyId}`, function(err,result) {
            if (err) throw err;
            console.log(`utente tolto dalla lista`);
            msg.reply(`${msg_info.replyName}, <em>\nsei stato tolto dalla lista ☺️</em>`,{ parse_mode: "html"});
          });   
        }) // 
      })
    }
  }) 
}); 
