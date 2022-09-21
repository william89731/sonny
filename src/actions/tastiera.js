const App = require('/bot/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.hears(process.env.CODE, async (ctx) => {
    ctx.deleteMessage();
    console.log("comando tastiera eseguito");
    return await ctx.reply(`[]`,Markup
    .keyboard([ 
        ['🤖sonny', '🙎users','🥷admin'],
               ])
  
    .resize()
    
    )


}) ; 
       





