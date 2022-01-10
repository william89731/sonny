const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
const fs = require('fs');
require('dotenv').config({ path: '/bot/.env' });
const ms = require('ms');
const express = require("express");
const mysql = require("mysql2");
const app = express();
let rawbadwords =  fs.readFileSync('/bot/src/settings/badwords.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  }); 
const WORDS = rawbadwords.split('\n');  
App.bot.on('message', (msg) => {
    let text = msg.update.message.text;
    let words = text.toLowerCase().trim().replace(/[".,\/#!$%\^&\*;:{}=\-_`~()]/g,"") ; 
    let words2 = words.split(' ') ; 
     console.log(`${words2}`);
     for ( let word of words2) {
         if ( WORDS.indexOf(word) > -1 ) {
             // bad word found!
             console.log( word, 'has been found in the message!');
             chatId = msg.chat.id;
             messageId = msg.message_id;
             fromId = msg.from.id;
             //replyId = msg.message.reply_to_message.from.id;
            // replyName = msg.message.reply_to_message.from.first_name;
             fromName = msg.from.first_name;
             testo = msg.update.message ;
            // msg.deleteMessage();
            // App.bot.telegram.sendMessage(msg.chat.id,`${msg.from.first_name}, ⛔ \n<em>Hai usato un termine presente in blackList.</em>\n<em>Cancella o modifica il messaggio</em>`,{ parse_mode: "html"})
            App.bot.telegram.getChatMember(chatId,fromId).then(function(result){
                
                console.log(`l'utente da ammonire ha id: ${fromId}`);
                let con = mysql.createConnection({
                  connectionLimit: 10,
                  host: process.env.MYSQL_HOST  ,
                  user: process.env.MYSQL_USER  ,
                  password: process.env.MYSQL_ROOT_PASSWORD ,
                  database: process.env.MYSQL_DATABASE ,
                  });
                con.connect(function(err) {
                    if (err) throw err;
                    con.query(`SELECT COUNT(*) as strike FROM membri WHERE  user_id = ${fromId}`, function(err,result) {
                    if (err) throw err;
                      console.log(`${result[0].strike}`);
                    if (`${result[0].strike}` === "0" ) {
                      console.log (`user not found!`);
                      con.query(`INSERT INTO membri ( user_id, user_name, strike ) VALUES ('${fromId}','${fromName}', 1 )`, function(err,result) {
                        if (err) throw err;
                        console.log (`utente inserito nella lista`);
                      }); 
                      con.query(`SELECT strike FROM membri WHERE  user_id='${fromId}'`, function(err,result) {
                        if (err) throw err;
                        console.log(`${result[0].strike}`);
                        msg.reply(`❌ ⚾ \n${fromName},<em>hai commesso una infrazione!</em> \n<em>cancella o modifica il messaggio!</em> \n ${result[0].strike}/3 <em>strike</em> `,{ parse_mode: "html"});
                      }); 
        
                    }
                    else { 
                      console.log (`user found!`);
                      con.query(`UPDATE membri SET strike=strike+1 WHERE user_id='${fromId}'`, function(err,result) {
                        if (err) throw err;
                        console.log (`strike aggiornato`);
                      });
                      con.query(`SELECT strike FROM membri WHERE  user_id='${fromId}'`, function(err,result) {
                        if (err) throw err;
                        console.log(`${result[0].strike}`);
                        if (`${result[0].strike}` > "2"){
                          noperms = {};
                          noperms.can_send_message = false;
                          noperms.can_send_media_messages = false;
                          noperms.can_send_other_messages = false;
                          noperms.can_can_add_web_page_previews = false;
                          App.bot.telegram.restrictChatMember(chatId, fromId, {until_date: Math.round((Date.now() + ms(1 + 'm'))/1000) }, noperms).then(function(result){
                            msg.reply(`❌ ⚾ \n${fromName}, <em>\nSei arrivato al terzo strike!</em> \n<em>Sei stato mutato per 1 min 🤐</em> `,{ parse_mode: "html"});
                           // App.bot.deleteMessage(chat.id, messageId);
                        }) // restrictChatMember
                        con.query(`DELETE FROM membri  WHERE  user_id = ${fromId}`, function(err,result) {
                          if (err) throw err;
                          console.log(`utente  tolto dalla lista`);
                          });   
                        }
                        else{
                          msg.reply(`❌ ⚾ \n${fromName},<em>hai commesso una infrazione!</em> \n<em>cancella o modifica il messaggio!</em> \n ${result[0].strike}/3 <em>strike</em> `,{ parse_mode: "html"});  
                        }  
                      });  
                    }
                  })
                    
                })
              }) /// 
            break;
         }
     }
 });