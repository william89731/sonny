const App = require('/bot/src/settings/app');
const tools = require('/bot/src/tools');
const fs = require('fs');
const ms = require('ms');
const express = require("express");
const mysql = require("mysql2");
const rawbadwords =  fs.readFileSync('/bot/src/settings/badwords.txt', 'utf8',(err, data) => {
  if (err) throw err;
});

// carica solo una volta le parole proibite
let WORDS = rawbadwords.split('\n');

const con = mysql.createConnection({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST  ,
  user: process.env.MYSQL_USER  ,
  password: process.env.MYSQL_ROOT_PASSWORD ,
  database: process.env.MYSQL_DATABASE ,
}); 

App.bot.on('message', (msg,) => {
  try{
    let text = msg.update.message.text;
    let words = text.toLowerCase().trim().replace(/[".,\/#!$%\^&\*;:{}=\-_`~()]/g,"") ; 
    let words2 = words.split(' ') ; 

    console.log(`${words2}`);

    for ( let word of words2) {
      if ( WORDS.indexOf(word) > -1 ) {        
        console.log( word, 'has been found in the message!');
        chatId = msg.chat.id;
        messageId = msg.message_id;
        fromId = msg.from.id;
        fromName = msg.from.first_name;
        testo = msg.update.message ; 

        userAlias = tools.getUsernameOrId(msg);

        App.bot.telegram.getChatMember(chatId,fromId).then(function(result){

          console.log(`l'utente da ammonire ha id: ${fromId}`);
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
                  msg.reply(`
                         ${userAlias} ❌ ⚾ strike! 
                        \n<em>motivo: uso di un termine presente in blacklist</em> 
                        \n<em>cancella o modifica il messaggio!</em> 
                        \n${result[0].strike}/3 <em>strike</em> `,{ parse_mode: "html"});
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
                      msg.reply(`
                            ${userAlias}, 
                            \n<em>Sei arrivato al terzo strike!</em> 
                            \n<em>Sei stato mutato per 1 min 🤐</em> `,{ parse_mode: "html"});

                    }) 
                    con.query(`DELETE FROM membri  WHERE  user_id = ${fromId}`, function(err,result) {
                      if (err) throw err;
                      console.log(`utente  tolto dalla lista`);
                    });   
                  }
                  else{
                    msg.reply(`
                          ${userAlias} ❌ ⚾ strike! 
                          \n<em>motivo: uso di un termine presente in blacklist</em> 
                          \n<em>cancella o modifica il messaggio!</em> 
                          \n${result[0].strike}/3 <em>strike</em>`,{ parse_mode: "html"});  
                  }  
                });  
              }
            })

          })
        }) /// 
        break;
      }   
    }
  }
  catch (e) {
    // console.log("entering catch block");
    console.log(e);
    // console.log("leaving catch block");
  }
  // finally {
  //   console.log("entering and leaving the finally block");
  // }

  // console.log("leaving try-catch statement");    
});

