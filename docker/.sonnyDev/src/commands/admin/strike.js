const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
const ms = require('ms');
require('dotenv').config({ path: '/bot/.env' });
const express = require("express");
const mysql = require("mysql2");
const app = express();
App.bot.command(`strike`,  function(msg) {
  msg.deleteMessage();
  console.log("comando strike eseguito");
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
        console.log(`l'utente da ammonire ha id: ${replyId}`);
        let con = mysql.createConnection({
          connectionLimit: 10,
          host: process.env.MYSQL_HOST  ,
          user: process.env.MYSQL_USER  ,
          password: process.env.MYSQL_ROOT_PASSWORD ,
          database: process.env.MYSQL_DATABASE ,
          });
        con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT COUNT(*) as strike FROM membri WHERE  user_id = ${replyId}`, function(err,result) {
            if (err) throw err;
              console.log(`${result[0].strike}`);
            if (`${result[0].strike}` === "0" ) {
              console.log (`user not found!`);
              con.query(`INSERT INTO membri ( user_id, user_name, strike ) VALUES ('${replyId}','${replyName}', 1 )`, function(err,result) {
                if (err) throw err;
                console.log (`utente inserito nella lista`);
              }); 
              con.query(`SELECT strike FROM membri WHERE  user_id='${replyId}'`, function(err,result) {
                if (err) throw err;
                console.log(`${result[0].strike}`);
                msg.reply(`❌ ⚾ \n${replyName}, <em>hai commesso una infrazione!</em> \n ${result[0].strike}/3 <em>strike</em> `,{ parse_mode: "html"});
              }); 

            }
            else { 
              console.log (`user found!`);
              con.query(`UPDATE membri SET strike=strike+1 WHERE user_id='${replyId}'`, function(err,result) {
                if (err) throw err;
                console.log (`strike aggiornato`);
              });
              con.query(`SELECT strike FROM membri WHERE  user_id='${replyId}'`, function(err,result) {
                if (err) throw err;
                console.log(`${result[0].strike}`);
                if (`${result[0].strike}` == "3"){
                  noperms = {};
                  noperms.can_send_message = false;
                  noperms.can_send_media_messages = false;
                  noperms.can_send_other_messages = false;
                  noperms.can_can_add_web_page_previews = false;
                  App.bot.telegram.restrictChatMember(chatId, replyId, {until_date: Math.round((Date.now() + ms(1 + 'm'))/1000) }, noperms).then(function(result){
                    msg.reply(`❌ ⚾ \n${replyName}, <em>Sei arrivato al terzo strike!</em> \n<em>Sei stato mutato per 1 min 🤐</em> `,{ parse_mode: "html"});
                   // App.bot.deleteMessage(chat.id, messageId);
                }) // restrictChatMember
                con.query(`DELETE FROM membri  WHERE  user_id = ${replyId}`, function(err,result) {
                  if (err) throw err;
                  console.log(`utente  tolto dalla lista`);
                  });   
                }
                else{
                  msg.reply(`❌ ⚾ \n${replyName}, <em>hai commesso una infrazione!</em> \n ${result[0].strike}/3 <em>strike</em> `,{ parse_mode: "html"});  
                }  
              });  
            }
          })
            
        })
      }) ///
    }//creator or admin
  }) //get member
}); //command


