const App = require('/bot/src/settings/app');
const ms = require('ms');
App.bot.command(`i`,  async ctx => {
    ctx.deleteMessage();
    console.log("comando 1 eseguito");
    chatId = msg.chat.id;
    messageId = msg.message_id;
    fromId = msg.from.id;
    replyId = msg.message.reply_to_message.from.id;
    replyName = msg.message.reply_to_message.from.first_name;
    fromName = msg.from.first_name;
    testo = msg.update.message ;
    time = testo.text.split(' ')[1];  
    await ctx.reply(testo)   
});