require('dotenv').config({ path: '/bot/src/settings/.env' });
//const { Telegraf, Markup, keyboard ,extra  } = require('telegraf');
const path = require('path'); 
console.log("dir",__dirname);
const App = require('/bot/src/settings/app'); 
App.bot.start(async (ctx) => { 
  return await ctx.reply(`<em>inserire il codice</em>`, { parse_mode: "html"} )        
}); 

//ACTIONS CHAT
require('/bot/src/actions/tastiera');
require('/bot/src/actions/sonny');
require('/bot/src/actions/admin');
require('/bot/src/actions/user');

//COMANDS USERS
require('/bot/src/users/sicurezzaIot');
require('/bot/src/users/github');
require('/bot/src/users/nodered');
require('/bot/src/users/homeAssistant');
require('/bot/src/users/openhab');
require('/bot/src/users/search');
require('/bot/src/users/regolamento');
require('/bot/src/users/matrix');
require('/bot/src/users/meteo');
require('/bot/src/users/allerte.js');



//COMMANDS ADMIN
require('/bot/src/commands/admin/mute');
require('/bot/src/commands/admin/unmute');
require('/bot/src/commands/admin/ban');
require('/bot/src/commands/admin/unban');

//RESTRICH
require('/bot/src/actions/newEntry');
require('/bot/src/actions/badwords');




App.bot.launch();
process.once('SIGINT', () => App.bot.stop('SIGINT'))
process.once('SIGTERM', () => App.bot.stop('SIGTERM'))






