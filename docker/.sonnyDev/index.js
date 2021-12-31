require('dotenv').config({ path: '/bot/src/settings/.env' });
//const { Telegraf, Markup, keyboard ,extra  } = require('telegraf');
const path = require('path'); 
console.log("dir",__dirname);
const App = require('/bot/src/settings/app'); 



//const newMember = require('/home/william/docker/.sonnyTest/src/actions/newMember');

//COMANDI ADMIN
//const mute = require('/bot/src/commands/mute');
//COMANDI UTENTI
//const sicurezza = require('/bot/src/actions/sicurezza'); //gli altri tre comandi ok, questo no.. boh


App.bot.start(async (ctx) => { 
  return await ctx.reply(`<em>inserire il codice</em>`, { parse_mode: "html"} )        
}); 

/*App.bot.hears(process.env.CODE, async (ctx) => {
  ctx.deleteMessage();
  return await ctx.reply(`ready`,App.Markup
  .keyboard([ 
      ['🤖 sonny','📜 regolamento', '🔍 cerca'],  
      ['😎 matrix','⛅ meteo','🐈 gitHub' ], 
      ['🏠 nodeRed','🏡 homeAssistant', '🏘️ openHab'],
      ['🔐 Sicurezza IOT','🥷 admin'],  
  ])
  .oneTime()
  .resize()
)
}) ; */

//COMANDS USERS
require('/bot/src/actions/tastiera');
require('/bot/src/actions/sonny');
require('/bot/src/actions/sicurezzaIot');
require('/bot/src/actions/github');
require('/bot/src/actions/nodered');
require('/bot/src/actions/homeAssistant');
require('/bot/src/actions/openhab');
require('/bot/src/actions/search');
require('/bot/src/actions/regolamento');
require('/bot/src/actions/matrix');
require('/bot/src/actions/meteo');
require('/bot/src/actions/admin');

//COMMANDS ADMIN
require('/bot/src/commands/admin/mute');
require('/bot/src/commands/admin/unmute');
require('/bot/src/commands/admin/ban');
require('/bot/src/commands/admin/unban');


//ACTIONS CHAT
require('/bot/src/actions/badwords');
//require('/bot/src/actions/newMember');



App.bot.launch();
process.once('SIGINT', () => App.bot.stop('SIGINT'))
process.once('SIGTERM', () => App.bot.stop('SIGTERM'))






