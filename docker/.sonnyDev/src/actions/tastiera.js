const path = require('path'); 
console.log("dir",__dirname);
const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
//const Code = ( process.env.CODE );
App.bot.hears(process.env.CODE, async (ctx) => {
  //  ctx.deleteMessage();
    console.log("comando tastiera eseguito");
    return await ctx.reply(`ready`,App.Markup
    .keyboard([ 
        ['🤖sonny', '🙎users','🥷admin'],
               ])
  
    .resize()
    
    )


}) ; 
       





