const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
require('dotenv').config({ path: '/bot/.env' });

const bot = new Telegraf( process.env.BOT_TOKEN );

module.exports = { bot, Telegraf, Markup, keyboard ,extra,};

module.exports.default = { bot, Telegraf, Markup, keyboard ,extra};
