
const App = require('/bot/src/settings/app');
const ms = require('ms');

App.bot.command(`mute`,  function(msg) {
    msg.deleteMessage();
    console.log("comando mute eseguito");
    chatId = msg.chat.id;
    messageId = msg.message_id;
    fromId = msg.from.id;
    replyId = msg.message.reply_to_message.from.id;
    replyName = msg.message.reply_to_message.from.first_name;
    fromName = msg.from.first_name;
    testo = msg.update.message ;
    time = testo.text.split(' ')[1];  
    // TODO call from tools.js 
    if (msg.message.reply_to_message.from.username !== undefined) {
        userAlias = `@${msg.message.reply_to_message.from.username}`;
    } else {
        userAlias = `${msg.message.reply_to_message.from.id}`;
    } 
    noperms = {};
    noperms.can_send_message = false;
    noperms.can_send_media_messages = false;
    noperms.can_send_other_messages = false;
    noperms.can_can_add_web_page_previews = false;
    
    if (msg.message.reply_to_message == undefined){
        return;
    }
    
     App.bot.telegram.getChatMember(chatId, fromId).then(function(data){
        if ((data.status == 'creator') || (data.status == 'administrator')){
            App.bot.telegram.restrictChatMember(chatId, replyId, {until_date: Math.round((Date.now() + ms(time + 'm'))/1000) }, noperms).then(function(result){
                App.bot.telegram.sendMessage(chatId,userAlias + "<em>\nsei stato mutato per</em> " + time + " <em>min</em> 🤐" ,{ parse_mode: "html"});
               // App.bot.deleteMessage(chat.id, messageId);
            }) // restrictChatMember
        } else {
             App.bot.telegram.sendMessage(chatId,`${userAlias}, non sei autorizzato a usare questo comando`);
        }
    }) 
   
});
