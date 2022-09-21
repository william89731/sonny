const App = require('/bot/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.command(`unban`, function(msg){
    msg.deleteMessage();
    
    let chatId = msg.chat.id;
    let userId = msg.from.id;
    let replyId = msg.message.reply_to_message.from.id;
    let replyName = msg.message.reply_to_message.from.first_name;
    let replyUsername = msg.message.reply_to_message.from.username;
    let fromName = msg.from.first_name;
    let messageId = msg.message.message_id;
   if(msg.message.reply_to_message == undefined){
   return;
   }
    if (replyUsername !== undefined) {
    userAlias = replyId;
    } else {
    userAlias = replyUsername;
    } 
    if (msg.message.reply_to_message == undefined){
    return;
    }
  App.bot.telegram.getChatMember(chatId, userId).then(function(data){
       if((data.status == 'creator') || (data.status == 'administrator')){
            App.bot.telegram.unbanChatMember(chatId, replyId).then(function(result){
            //    bot.telegram.deleteMessage(chatId, messageId);
               App.bot.telegram.sendMessage(chatId, `${userAlias} <em>e' stao sbannato dal gruppo</em>`,{ parse_mode: "html"});
            })
        }
        else {
            App.bot.telegram.sendMessage(chatId,`${fromName}, <em>non sei autorizzato a usare questo comando</em>`,{ parse_mode: "html"});
        }
    })
});