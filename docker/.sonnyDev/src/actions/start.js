require('dotenv').config({ path: '/bot/src/settings/.env' });
//const { Telegraf, Markup, keyboard ,extra  } = require('telegraf');
//const path = require('path'); 
//console.log("dir",__dirname);
const App = require('/bot/src/settings/app'); 
const got = require('got');
console.log(`sonny avviato`)  


App.bot.start(async (ctx) => { 
  return await ctx.reply(`<em>inserire il codice</em>`, { parse_mode: "html"} )
  
}); 

App.bot.launch();
process.once('SIGINT', () => App.bot.stop('SIGINT'))
process.once('SIGTERM', () => App.bot.stop('SIGTERM'))