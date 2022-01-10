const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.action('kubernetes', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `${ctx.from.first_name}, 👇`;
    ctx.telegram.sendMessage(chatId ,botReply,
        {
            reply_markup:{
                inline_keyboard:[
                    [{text:"kubernetes.io", url:"https://kubernetes.io/it/"}],
                    [{text:"microk8s.io", url:"https://microk8s.io/"}],
                    [{text:"k3s.io", url:"https://k3s.io/"}],                 
                ]         
            },
        
        })
        .then((result) => { setTimeout(() => {
            App.bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 30 * 1000)})
        .catch(err => console.log(err))         
});