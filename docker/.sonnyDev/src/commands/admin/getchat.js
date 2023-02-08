const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
const ms = require('ms');
App.bot.command(`getchat`, function(msg, match){
  msg.deleteMessage();
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  //  chat.id = msg.chat.id;
  const chatTitle = msg.chat.title;
  const chatType = msg.chat.type;
  const chatMessage_id = msg.message_id;
  //   let replyId = msg.message.reply_to_message.from.id;
  //   let replyName = msg.message.reply_to_message.from.first_name;
  const fromName = msg.from.first_name;
  //   let messageId = msg.message.message_id;
  //  if (msg.message.reply_to_message == undefined){
    //     return;
    //  }

  App.bot.telegram.getChatMember(chatId, fromId).then(function(data){
    if ((data.status == 'creator') || (data.status == 'administrator')){
      if (chatType == 'private') {
        App.bot.telegram.sendMessage(chatId, `
          👤 <em>Chat name</em>: ${chatTitle}
          \n ChatID: <em>${chatId}</em>`, { parse_mode: 'HTML' });
      }
      else {
        App.bot.telegram.sendMessage(chatId, `_${fromName}, <em>comando non disponibile in chat pubblica</em>`,{ parse_mode: "html"})
      }    
    }
  })    

});
