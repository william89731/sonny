const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.action('docker', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `${ctx.from.first_name}, 👇`;
    ctx.telegram.sendMessage(chatId ,botReply,
        {
            reply_markup:{
                inline_keyboard:[
                    [{text:"docker.com", url:"https://www.docker.com"}],
                    [{text:"docker-compose", url:"https://docs.docker.com/compose"}],
                       
                ]         
            },
        
        })
        .then((result) => { setTimeout(() => {
            App.bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 30 * 1000)})
        .catch(err => console.log(err))         
});