//const path = require('path'); 
//console.log("dir",__dirname);
const App = require('/bot/src/settings/app');
const tools = require('/bot/src/tools');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
//require('/bot/src/commands/buttons');
App.bot.hears('🤖sonny',  ctx => {
  //  const opts = {
    //     reply_to_message_id: ctx.message.id,

    //  };  
  ctx.deleteMessage();
  console.log("comando sonny eseguito");
  let chatId = ctx.chat.id;
  // let FromName =  ctx.from.first_name;
  userAlias = tools.getUsernameOrFirstName(ctx);


  ctx.reply(`<em>hey ciao</em> ${userAlias} \n<em>Sono il tuo amichevole bot di quartiere ☺️</em> \n<em>per avere una conversazione,usa il comando /sonny (+ testo)</em>`,{parse_mode: "html"}) 
  /*  .then((result) => { setTimeout(() => {
    App.bot.telegram.deleteMessage(chatId, result.message_id)
  }, 30* 1000)}) 
    .catch(err => console.log(err)) */     
});
