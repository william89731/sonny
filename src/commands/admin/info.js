const App = require('/bot/settings/app');
const { Telegraf, Markup, keyboard, extra } = require('telegraf');
const ms = require('ms');
const mysql = require("mysql2");

App.bot.command(`info`, function (ctx, match) {
  ctx.deleteMessage();
  const chatId = ctx.chat.id;
  const userId = ctx.from.id;
  const chatUsername = ctx.chat.username;
  //  chat.id = ctx.chat.id;
  const chatTitle = ctx.chat.title;
  const chatType = ctx.chat.type;
  const chatMessage_id = ctx.message_id;
  //   let replyId = ctx.message.reply_to_message.from.id;
  //   let replyName = ctx.message.reply_to_message.from.first_name;
  const fromName = ctx.from.first_name;
  //   let messageId = ctx.message.message_id;
  //  if (ctx.message.reply_to_message == undefined){
  //     return;
  //  }
  const member = ctx.update.message.text.split(' ')[1];;
  if (ctx.from.username !== undefined) {
    userAlias = `@${ctx.from.username}`;

  }
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
    pool.query(`SELECT COUNT(*) as strike FROM utenti WHERE  user_name = ${member}`, function (err, result) {
      if (err) throw err;
      //console.log(`${result[0].strike}`);
      if (`${result[0].strike}` === "0") {
        console.log(`user not found!`);
        
        pool.query(`SELECT strike FROM utenti WHERE  user_name='${replyId}'`, function (err, result) {
          if (err) throw err;
          // console.log(`${result[0].strike}`);
          
        });

      }
      else {
        console.log(`user found!`);
        
        pool.query(`SELECT strike FROM utenti WHERE  user_id='${replyId}'`, function (err, result) {
          if (err) throw err;
          console.log(`${result[0].strike}`);
          
          
        });
      }
    })

  });
  App.bot.telegram.getChatMember(chatId, userId).then(function (data) {
    if ((data.status == 'creator') || (data.status == 'administrator')) {
      
        App.bot.telegram.sendMessage(chatId, `
                    👤 
                    \n alias: <em>${member}</em>
                    \n strike: ${result[0].strike}`, { parse_mode: 'HTML' });
      }
      else {
        App.bot.telegram.sendMessage(chatId, `_${userAlias}, <em>non sei autorizzato a usare questo comando</em>`,{ parse_mode: "html"})
      }
    
  })

});