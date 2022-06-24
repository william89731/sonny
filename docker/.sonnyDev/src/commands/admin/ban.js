const App = require('/bot/src/settings/app');
const Message = require('/bot/src/message');
const tools = require('/bot/src/tools');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
const ms = require('ms');
var userAlias;

function ban(msg_info){
    App.bot.telegram.getChatMember(msg_info.chatId, msg_info.userId).then(function(data){
        if (tools.isAdmin(App.bot.telegram.getChatMember(msg_info.chatId, msg_info.fromId))) {
            App.bot.telegram.kickChatMember(msg_info.chatId, msg_info.replyId,{until_date: Math.round((Date.now() + ms('7 days'))/1000)}).then(function(result){
                //  bot.telegram.deleteMessage(chatId, messageId);
                App.bot.telegram.sendMessage(msg_info.chatId,`${userAlias}  <em>e' stato bannato dal gruppo</em>`,{ parse_mode: "html"})
            })
        }
        else {
            App.bot.telegram.sendMessage(msg_info.chatId, `${userAlias}, <em>non sei autorizzato a usare questo comando</em>`,{ parse_mode: "html"})
        }
    })
}
function unban(msg_info){
    App.bot.telegram.getChatMember(msg_info.chatId, msg_info.userId).then(function(data){
        if (tools.isAdmin(App.bot.telegram.getChatMember(msg_info.chatId, msg_info.fromId))) {
            App.bot.telegram.unbanChatMember(msg_info.chatId, msg_info.replyId).then(function(result){
                //    bot.telegram.deleteMessage(msg_info.chatId, messageId);
                App.bot.telegram.sendMessage(msg_info.chatId, `${msg_info.replyName} <em>e' stao sbannato dal gruppo</em>`,{ parse_mode: "html"});
            })
        }
        else {
            App.bot.telegram.sendMessage(msg_info.chatId,`${msg_info.fromName}, <em>non sei autorizzato a usare questo comando</em>`,{ parse_mode: "html"});
        }
    })

}
App.bot.command(`ban`, function(msg, match){
    console.log("eseguo comando BAN");
    msg.deleteMessage();
    var msg_info = new Message(msg);

    userAlias = tools.getUsernameOrId(msg);

    if(!msg_info.replyId){
        return;
    }
    ban(msg_info);
});

App.bot.command(`unban`, function(msg, match){
    console.log("eseguo comando UNBAN");
    msg.deleteMessage();
    var msg_info = new Message(msg);

    userAlias = tools.getUsernameOrId(msg);

    if(!msg_info.replyId){
        return;
    }
    unban(msg_info);
});
