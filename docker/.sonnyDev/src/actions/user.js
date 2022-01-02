const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.hears('🙎users', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `${ctx.from.first_name}, 👇`;
    ctx.telegram.sendMessage(chatId ,botReply,
        {
            reply_markup:{
                inline_keyboard:[
                    [{text:"duckduckgo", callback_data: `duckduckgo`}],            
                    [{text:"google", callback_data: `google`}],
                    [{text:"nodered", callback_data: `node`}],
                    [{text:"wikipedia", callback_data: `wiki`}], 
                               
                    
                ]         
            },
        
        })
        .then((result) => { setTimeout(() => {
            App.bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 300 * 1000)})
        .catch(err => console.log(err))         
});