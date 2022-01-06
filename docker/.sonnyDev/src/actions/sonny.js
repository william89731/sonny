//const path = require('path'); 
//console.log("dir",__dirname);
const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
//require('/bot/src/commands/buttons');
App.bot.hears('🤖sonny',  ctx => {
    ctx.deleteMessage();
    console.log("comando sonny eseguito");
    let chatId = ctx.chat.id;
    let FromName = ctx.from.first_name;
       // let botReply2 = `_HEY,ciao_!  ${FromName} \n<em>Sono il tuo amichevole bot di quartiere</em> ☺️`;
       App.bot.telegram.sendMessage(chatId,`<em>hey ciao</em> ${FromName} \n<em>Sono il tuo amichevole bot di quartiere</em> ☺️ \n<em>per avere una conversazione,usa il comando /s (+ testo)</em>`,{parse_mode: "html"}) 
            .then((result) => { setTimeout(() => {
                App.bot.telegram.deleteMessage(chatId, result.message_id)
            }, 30* 1000)})
            .catch(err => console.log(err))      
});