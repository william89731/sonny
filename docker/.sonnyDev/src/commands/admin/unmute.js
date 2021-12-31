const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.command(`unmute`, function(msg){
    let chatId = msg.chat.id;
    let fromId = msg.from.id;
    let fromName = msg.from.first_name;
    let replyName = msg.message.reply_to_message.from.first_name;
    let replyId = msg.message.reply_to_message.from.id;
    const perms = {};
    
    perms.can_send_message = true;
    perms.can_send_media_messages = true;
    perms.can_send_other_messages = true;
    perms.can_can_add_web_page_previews = true;
    
    if (msg.message.reply_to_message == undefined){
        return;
    }
    
    App.bot.telegram.getChatMember(chatId, fromId).then(function(data){
        if ((data.status == 'creator') || (data.status == 'administrator')){
            App.bot.telegram.restrictChatMember(chatId, replyId, perms).then(function(result){
                App.bot.telegram.sendMessage(chatId,`${replyName}, <em>sei abilitato all'uso della chat</em>`,{ parse_mode: "html"});
            }) 
        }
        else {
        App.bot.telegram.sendMessage(chatId, `${fromName}, <em>non sei autorizzato a usare questo comando</em>`,{ parse_mode: "html"});
        }
    }) 
});