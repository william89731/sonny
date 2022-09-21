const App = require('/bot/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
const ms = require('ms');
App.bot.command(`ban`, function(ctx, match){
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let userId = ctx.from.id;
    let replyId = ctx.message.reply_to_message.from.id;
    let replyName = ctx.message.reply_to_message.from.first_name;
    let replyUsername = ctx.message.reply_to_message.from.username;
    let fromName = ctx.from.first_name;
    let messageId = ctx.message.message_id;

    if (replyUsername !== undefined) {
        userAlias = replyId;
    } else {
        userAlias = replyUsername;
    } 
    if (ctx.message.reply_to_message == undefined){
        return;
    }
    App.bot.telegram.getChatMember(chatId, userId).then(function(data){
        if((data.status == 'creator') || (data.status == 'administrator')){
        App.bot.telegram.kickChatMember(chatId, replyId,{until_date: Math.round((Date.now() + ms('7 days'))/1000)}).then(function(result){
              //  bot.telegram.deleteMessage(chatId, messageId);
                App.bot.telegram.sendMessage(chatId,`${userAlias}  <em>e' stato bannato dal gruppo</em>`,{ parse_mode: "html"})
            })
        }
        else {
        App.bot.telegram.sendMessage(chatId, `_${userAlias}, <em>non sei autorizzato a usare questo comando</em>`,{ parse_mode: "html"})
        }
    })
});