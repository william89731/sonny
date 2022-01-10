const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
const ms = require('ms');
App.bot.command(`ban`, function(msg, match){
    msg.deleteMessage();
    let chatId = msg.chat.id;
    let userId = msg.from.id;
    let replyId = msg.message.reply_to_message.from.id;
    let replyName = msg.message.reply_to_message.from.first_name;
    let fromName = msg.from.first_name;
    let messageId = msg.message.message_id;
    if (msg.message.reply_to_message == undefined){
        return;
    }
    App.bot.telegram.getChatMember(chatId, userId).then(function(data){
        if((data.status == 'creator') || (data.status == 'administrator')){
        App.bot.telegram.kickChatMember(chatId, replyId,{until_date: Math.round((Date.now() + ms('7 days'))/1000)}).then(function(result){
              //  bot.telegram.deleteMessage(chatId, messageId);
                App.bot.telegram.sendMessage(chatId,`${replyName}  <em>e' stato bannato dal gruppo</em>`,{ parse_mode: "html"})
            })
        }
        else {
        App.bot.telegram.sendMessage(chatId, `_${fromName}, <em>non sei autorizzato a usare questo comando</em>`,{ parse_mode: "html"})
        }
    })
});