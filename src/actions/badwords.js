try {
  const App = require('/bot/settings/app');
  const fs = require('fs');
  const ms = require('ms');
  const express = require("express");
  const mysql = require("mysql2");
  const rawbadwords = fs.readFileSync('/bot/settings/badwords.txt', 'utf8', (err, data) => {
    if (err) throw err;
  });

  // const con2 = mysql.createConnection({
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

  App.bot.on('message', (ctx,) => {

    let WORDS = rawbadwords.split('\n');
    let text = ctx.update.message.text;
    if (text !== undefined) {
      let words = text.toLowerCase().trim().replace(/[".,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      let words2 = words.split(' ');
      console.log(`${words2}`);
      for (let word of words2) {
        if (WORDS.indexOf(word) > -1) {
          console.log(word, 'has been found in the message!');
          chatId = ctx.chat.id;
          messageId = ctx.message_id;
          fromId = ctx.from.id;
          fromName = ctx.from.first_name;
        //  replyUsarname = ctx.message.reply_to_message.from.username;
          testo = ctx.update.message;
          if (ctx.from.username !== undefined) {
            userAlias = `@${ctx.from.username}`;
          } else {
            userAlias = `${ctx.from.id}`;
          }
          ctx.deleteMessage();
          App.bot.telegram.getChatMember(chatId, fromId).then(function (result) {
            console.log(`l'utente da ammonire ha id: ${fromId}`);
            pool.getConnection(function (err) {
              if (err) throw err;
              pool.query(`SELECT COUNT(*) as strike FROM utenti WHERE  user_id = ${fromId}`, function (err, result) {
                if (err) throw err;
                // console.log(`${result[0].strike}`);
                if (`${result[0].strike}` === "0") {
                  console.log(`user not found!`);
                  pool.query(`INSERT INTO utenti ( user_id, user_name, strike ) VALUES ('${fromId}','${ctx.from.username}', 0 )`, function (err, result) {
                    if (err) throw err;
                    console.log(`utente inserito nella lista`);
                  });
                  pool.query(`SELECT strike FROM utenti WHERE  user_id='${fromId}'`, function (err, result) {
                    if (err) throw err;
                    //   console.log(`${result[0].strike}`);
                    ctx.reply(`
                      ${userAlias}  
                      \n❗⚾  <em>foul</em>
                      \n<em>hay commesso una infrazione. sei stato inserito nella lista</em>
                      \n<em>motivo: uso di un termine presente in blacklist</em> `, { parse_mode: "html" });
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
                  pool.query(`UPDATE utenti SET strike=strike+1 WHERE user_id='${fromId}'`, function (err, result) {
                    if (err) throw err;
                    console.log(`strike aggiornato`);
                  });
                  pool.query(`SELECT strike FROM utenti WHERE  user_id='${fromId}'`, function (err, result) {
                    if (err) throw err;
                    //      console.log(`${result[0].strike}`);
                    if (`${result[0].strike}` > "2") {
                      noperms = {};
                      noperms.can_send_message = false;
                      noperms.can_send_media_messages = false;
                      noperms.can_send_other_messages = false;
                      noperms.can_can_add_web_page_previews = false;
                      App.bot.telegram.restrictChatMember(chatId, fromId, { until_date: Math.round((Date.now() + ms(1 + 'm')) / 1000) }, noperms).then(function (result) {
                        ctx.reply(`
                            ${userAlias}, 
                            \n<em>Sei arrivato al terzo strike!</em> 
                            \n<em>Sei stato mutato per 1 min 🤐</em> `, { parse_mode: "html" });
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

                      })
                      pool.query(`DELETE FROM utenti  WHERE  user_id = ${fromId}`, function (err, result) {
                        if (err) throw err;
                        console.log(`utente  tolto dalla lista`);
                      });
                    }
                    else {
                      ctx.reply(`
                      ${userAlias}  
                      \n❌ ⚾  (${result[0].strike}/3) <em>strike</em>
                      \n<em>motivo: uso di un termine presente in blacklist</em> `, { parse_mode: "html" });
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

                    }
                  });
                }
              })

            })
          }) /// 
          break;
        }
      }
    }


  });

}
catch (e) {
  console.log(e);
}