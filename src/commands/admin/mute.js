
const App = require('/bot/settings/app');
const ms = require('ms');

App.bot.command(`mute`,  function(ctx) {
    ctx.deleteMessage();
    
    console.log("comando mute eseguito");
    chatId = ctx.chat.id;
    messageId = ctx.message_id;
    fromId = ctx.from.id;
    replyId = ctx.message.reply_to_message.from.id;
    replyName = ctx.message.reply_to_message.from.first_name;
    replyMessage = ctx.message.reply_to_message.id;
    fromName = ctx.from.first_name;
    
    testo = ctx.update.message ;
    time = testo.text.split(' ')[1];  
    if (ctx.message.reply_to_message.from.username !== undefined) {
        userAlias = `@${ctx.message.reply_to_message.from.username}`;
    } else {
        userAlias = `${ctx.message.reply_to_message.from.id}`;
    } 
    noperms = {};
    noperms.can_send_message = false;
    noperms.can_send_media_messages = false;
    noperms.can_send_other_messages = false;
    noperms.can_can_add_web_page_previews = false;
    
    if (ctx.message.reply_to_message == undefined){
        return;
    }
    
     App.bot.telegram.getChatMember(chatId, fromId).then(function(data){
        if ((data.status == 'creator') || (data.status == 'administrator')){
            App.bot.telegram.restrictChatMember(chatId, replyId, {until_date: Math.round((Date.now() + ms(time + 'm'))/1000) }, noperms).then(function(result){
               // App.bot.telegram.deleteMessage(chatId, messageId);
                App.bot.telegram.sendMessage(chatId,userAlias + "<em>\nsei stato mutato per</em> " + time + " <em>min</em> 🤐" ,{ parse_mode: "html"});
                
            }) // restrictChatMember
        } else {
             App.bot.telegram.sendMessage(chatId,`${userAlias}, non sei autorizzato a usare questo comando`);
        }
    }) 
   
});
