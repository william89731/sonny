const App = require('/bot/src/settings/app');
const ms = require('ms');
App.bot.action('allerte', async (ctx) => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `${ctx.from.first_name},\nrispondi al messaggio che vuoi segnalare con @admin`;
    return await ctx.reply( botReply,{ parse_mode: "html"})
        
        .then((result) => { setTimeout(() => {
            App.bot.telegram.deleteMessage(ctx.chat.id, result.message_id,(err, data) => {
                if (err) throw err;
                console.log(data);
              })
               
        }, 10 * 1000)})
        .catch(err => console.log(err))         
});
App.bot.hears(`@admin`,  function(msg) {
    console.log("comando admin eseguito");
    chatId = msg.chat.id;
    messageId = msg.message_id;
    fromId = msg.from.id;
    replyId = msg.message.reply_to_message.from.id;
    replyName = msg.message.reply_to_message.from.first_name;
    fromName = msg.from.first_name;
    testo = msg.update.message ;
     App.bot.telegram.getChatMember(chatId, fromId).then(function(data){
        if ((data.status == 'member') ){
            App.bot.telegram.sendMessage(chatId,`${fromName}, segnalazione presa in carico`,{ parse_mode: "html"});    
            let admin1 = process.env.ID_ADMIN1; //william
            let admin2 = process.env.ID_ADMIN2;
            let gruppo = process.env.NICK_GROUP;
            let messageId = msg.message.reply_to_message.from.id ;
            link = `t.me/${gruppo}/${messageId}`;
            App.bot.telegram.sendMessage(admin1,`❗`,
            {
                reply_markup:{
                    inline_keyboard:[
                        
                        [{text:"segnalazione", url: link}],
                ]            
                },   
            });
            App.bot.telegram.sendMessage(admin2,`❗`,
            {
                reply_markup:{
                    inline_keyboard:[
                        
                        [{text:"segnalazione", url: link}],
                ]            
                },   
            });

        } else {
             App.bot.telegram.sendMessage(chatId,`${fromName}, questo comando e' ad uso esclusivo dei membri`);
        }
    }) 
   
});
  
  
       