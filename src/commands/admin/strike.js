const App = require('/bot/settings/app');
const { Telegraf, Markup, keyboard, extra } = require('telegraf');
const ms = require('ms');
require('dotenv').config({ path: '/bot/.env' });
const express = require("express");
const mysql = require("mysql2");
const app = express();
//const tools = require('/bot/settings/tools');
//const Message = require('/bot/settings/message');

App.bot.command(`strike`, function (ctx) {
  ctx.deleteMessage();
  console.log("comando strike eseguito");
  chatId = ctx.chat.id;
  messageId = ctx.message_id;
  fromId = ctx.from.id;
  replyId = ctx.message.reply_to_message.from.id;
  replyName = ctx.message.reply_to_message.from.first_name;
  replyUsarname = ctx.message.reply_to_message.from.username;
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
        console.log(`l'utente da ammonire ha id: ${replyId}`);
        //   const con2 = mysql.createConnection({
        //   connectionLimit: 10,
        //   host: process.env.MYSQL_HOST,
        //   user: process.env.MYSQL_USER,
        //   password: process.env.MYSQL_ROOT_PASSWORD,
        //   database: process.env.MYSQL_DATABASE,
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
          pool.query(`SELECT COUNT(*) as strike FROM utenti WHERE  user_id = ${replyId}`, function (err, result) {
            if (err) throw err;
            //console.log(`${result[0].strike}`);
            if (`${result[0].strike}` === "0") {
              console.log(`user not found!`);
              pool.query(`INSERT INTO utenti ( user_id, user_name, strike ) VALUES ('${replyId}','${replyUsarname}', 0 )`, function (err, result) {
                if (err) throw err;
                console.log(`utente inserito nella lista`);
              });
              pool.query(`SELECT strike FROM utenti WHERE  user_id='${replyId}'`, function (err, result) {
                if (err) throw err;
                // console.log(`${result[0].strike}`);
                ctx.reply(`
                ${userAlias}  
                \n❗⚾  <em>foul</em>
                \n<em>hay commesso una infrazione. sei stato inserito nella lista</em>
                \n<em>motivo: violazione delle norme</em> `, { parse_mode: "html" });
                setTimeout(() => {
                  ctx.reply(`${userAlias}`,
                    {
                      reply_markup: {
                        inline_keyboard: [
                          [{ text: "regolamento", url: "https://t.me/regole_domotica_network" }],
                        ]
                      },
                    }
                  )
                }, 1 * 1000)
              });

            }
            else {
              console.log(`user found!`);
              pool.query(`UPDATE utenti SET strike=strike+1 WHERE user_id='${replyId}'`, function (err, result) {
                if (err) throw err;
                console.log(`strike aggiornato`);
              });
              pool.query(`SELECT strike FROM utenti WHERE  user_id='${replyId}'`, function (err, result) {
                if (err) throw err;
                console.log(`${result[0].strike}`);
                if (`${result[0].strike}` == "3") {
                  noperms = {};
                  noperms.can_send_message = false;
                  noperms.can_send_media_messages = false;
                  noperms.can_send_other_messages = false;
                  noperms.can_can_add_web_page_previews = false;
                  App.bot.telegram.restrictChatMember(chatId, replyId, { until_date: Math.round((Date.now() + ms(1 + 'm')) / 1000) }, noperms).then(function (result) {
                    ctx.reply(`❌ ⚾ \n${userAlias}, \n<em>Sei arrivato al terzo strike!</em> \n<em>Sei stato mutato per 1 min 🤐</em> `, { parse_mode: "html" });
                  });
                  setTimeout(() => {
                    ctx.reply(`${userAlias}`,
                      {
                        reply_markup: {
                          inline_keyboard: [
                            [{ text: "regolamento", url: "https://t.me/regole_domotica_network" }],
                          ]
                        },
                      }
                    )
                  }, 1 * 1000);
                  pool.query(`DELETE FROM utenti  WHERE  user_id = ${replyId}`, function (err, result) {
                    if (err) throw err;
                    console.log(`utente  tolto dalla lista`);
                  });
                }
                else {
                  ctx.reply(`
                  ${userAlias}  
                  \n❌ ⚾  (${result[0].strike}/3) <em>strike</em>
                  \n<em>motivo: violazione delle norme</em> `, { parse_mode: "html" });
                  setTimeout(() => {
                    ctx.reply(`${userAlias}`,
                      {
                        reply_markup: {
                          inline_keyboard: [
                            [{ text: "regolamento", url: "https://t.me/regole_domotica_network" }],
                          ]
                        },
                      }
                    )
                  }, 1 * 1000);
                }
              });
            }
          })

        })
      }) ///
    }//creator or admin
  }) //get member
}); //command


