const App = require('/bot/settings/app');
const { Telegraf, Markup, keyboard, extra } = require('telegraf');
require('dotenv').config({ path: '/bot/.env' });
const express = require("express");
const mysql = require("mysql2");
const app = express();
App.bot.command(`unstrike`, function (ctx) {
    ctx.deleteMessage();
    console.log("comando unstrike eseguito");
    chatId = ctx.chat.id;
    messageId = ctx.message_id;
    fromId = ctx.from.id;
    replyId = ctx.message.reply_to_message.from.id;
    replyName = ctx.message.reply_to_message.from.first_name;
    fromName = ctx.from.first_name;
    testo = ctx.update.message;
    if (ctx.message.reply_to_message.from.username !== undefined) {
        userAlias = `@${ctx.message.reply_to_message.from.username}`;
    } else {
        userAlias = `${ctx.message.reply_to_message.from.id}`;
    }
    App.bot.telegram.getChatMember(chatId, fromId).then(function (data) {
        if ((data.status == 'creator') || (data.status == 'administrator')) {
            console.log(`l'utente e' un ${data.status}`);
            App.bot.telegram.getChatMember(chatId, replyId).then(function (result) {
                console.log(`l'utente da togliere ha id:'${replyId}'`);
                // let con = mysql.createConnection({
                //     connectionLimit: 10,
                //     host: process.env.MYSQL_HOST,
                //     user: process.env.MYSQL_USER,
                //     password: process.env.MYSQL_ROOT_PASSWORD,
                //     database: process.env.MYSQL_DATABASE,
                // });
                const pool = mysql.createPool({
                    host: process.env.MYSQL_HOST,
                    user: process.env.MYSQL_USER,
                    password: process.env.MYSQL_ROOT_PASSWORD,
                    database: process.env.MYSQL_DATABASE,
                    waitForConnections: true,
                    connectionLimit: 10,
                    queueLimit: 0
                  });
                pool.getConnection(function (err) {
                    if (err) throw err;
                    pool.query(`DELETE FROM utenti  WHERE  user_id = ${replyId}`, function (err, result) {
                        if (err) throw err;
                        console.log(`utente tolto dalla lista`);
                        ctx.reply(`
                        ${userAlias}
                        \n❗❗
                        \n<em>sei stato tolto dalla lista </em>`, { parse_mode: "html" });
                    });
                }) // 
            })
        }
    })
}); 