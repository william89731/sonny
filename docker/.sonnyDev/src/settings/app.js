//'use strict';
//const path = require('path'); 
//console.log("dir",__dirname);
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
const bot = new Telegraf( process.env.BOT_TOKEN );
//const code = ( process.env.CODE );

//const appID = process.env.API_OWM;
//require('dotenv').config();
//const ms = require('ms');


module.exports = { bot, Telegraf, Markup, keyboard ,extra };
// Allow use of default import syntax in TypeScript
module.exports.default = { bot, Telegraf, Markup, keyboard ,extra };