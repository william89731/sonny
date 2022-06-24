const App = require('/bot/src/settings/app');
const Message = require('/bot/src/message');
const tools = require('/bot/src/tools');
const ms = require('ms');
var userAlias;

function mute(msg_info){
    noperms = {};
    noperms.can_send_message = false;
    noperms.can_send_media_messages = false;
    noperms.can_send_other_messages = false;
    noperms.can_can_add_web_page_previews = false;

    if (tools.isAdmin(App.bot.telegram.getChatMember(msg_info.chatId, msg_info.fromId))) {
        App.bot.telegram.restrictChatMember(msg_info.chatId, msg_info.replyId, {until_date: Math.round((Date.now() + ms(msg_info.time + 'm'))/1000) }, noperms).then(function(result){
            App.bot.telegram.sendMessage(msg_info.chatId,userAlias + "<em>\nsei stato mutato per</em> " + msg_info.time + " <em>min</em> 🤐" ,{ parse_mode: "html"});
            // App.bot.deleteMessage(chat.id, messageId);
        }) // restrictChatMember
    } else {
        App.bot.telegram.sendMessage(msg_info.chatId,`${userAlias}, non sei autorizzato a usare questo comando`);
    }
}

function unmute(msg_info){

    const perms = {};

    perms.can_send_message = true;
    perms.can_send_media_messages = true;
    perms.can_send_other_messages = true;
    perms.can_can_add_web_page_previews = true;

    App.bot.telegram.getChatMember(msg_info.chatId, msg_info.fromId).then(function(data){
        if (tools.isAdmin(App.bot.telegram.getChatMember(msg_info.chatId, msg_info.fromId))) {
            App.bot.telegram.restrictChatMember(msg_info.chatId, msg_info.replyId, perms).then(function(result){
                App.bot.telegram.sendMessage(msg_info.chatId,`${msg_info.replyName}, <em>sei abilitato all'uso della chat</em>`,{ parse_mode: "html"});
            }) 
        }
        else {
            App.bot.telegram.sendMessage(msg_info.chatId, `${msg_info.fromName}, <em>non sei autorizzato a usare questo comando</em>`,{ parse_mode: "html"});
        }
    }) 

}
App.bot.command(`unmute`,  function(msg) {
    console.log("comando unmute eseguito");
    var msg_info = new Message(msg);
    msg.deleteMessage();
    if(!msg_info.replyId){
        // TODO dare istruzioni: selezionare msg_info e rispindere con /mute
        return;
    }
    userAlias = tools.getUsernameOrId(msg.message.reply_to_message);
    unmute(msg_info);
});
App.bot.command(`mute`,  function(msg) {
    console.log("comando mute eseguito");
    var msg_info = new Message(msg);
    msg.deleteMessage();

    if(!msg_info.replyId){
        // TODO dare istruzioni: selezionare msg_info e rispindere con /mute
        return;
    }
    userAlias = tools.getUsernameOrId(msg.message.reply_to_message);
    mute(msg_info);

});
