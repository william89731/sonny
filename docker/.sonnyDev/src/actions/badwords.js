const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
const fs = require('fs');
let rawbadwords =  fs.readFileSync('/bot/src/settings/badwords.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  }); 
const WORDS = rawbadwords.split('\n');  
App.bot.on('message', (msg) => {
  
     let text = msg.update.message.text 
     let words = text.toLowerCase().split(' ');
     for ( let word of words) {
         if ( WORDS.indexOf(word) > -1 ) {
             // bad word found!
             console.log( word, 'has been found in the message!');
             msg.deleteMessage();
             App.bot.telegram.sendMessage(msg.chat.id,`${msg.from.first_name}, ⛔ \n<em>Hai usato un termine presente in blackList</em>`,{ parse_mode: "html"})
             break;
         }
     }
 });