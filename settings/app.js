const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
require('dotenv').config();
//console.log(process.env); 
const bot = new Telegraf( process.env.BOT_TOKEN );
//require('dotenv').config({ path: '/bot/.env' });

module.exports = { bot, Telegraf, Markup, keyboard ,extra,};

module.exports.default = { bot, Telegraf, Markup, keyboard ,extra};