const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.hears('😎 matrix', ctx => {
    console.log(ctx.from)
    let matrixMessage = ` ${ctx.from.first_name}, vuoi sapere cosa e' matrix? \n fai la tua scelta:`;
    ctx.deleteMessage();
    App.bot.telegram.sendMessage(ctx.chat.id, matrixMessage, {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: "pillola azzurra",
                        callback_data: 'pillola azzurra'
                    },
                    {
                        text: "pillola rossa",
                        callback_data: 'pillola rossa'
                    }
                ],

            ]
        }
    })
});


App.bot.action('pillola azzurra', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `😞` ;
    App.bot.telegram.sendMessage(chatId ,botReply) 
        .then((result) => { setTimeout(() => {
            App.bot.telegram.deleteMessage(chatId, result.message_id)
        }, 10 * 1000)})
        .catch(err => console.log(err))
});

App.bot.action('pillola rossa', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `😎` ;
    App.bot.telegram.sendMessage(chatId ,botReply) 
        .then((result) => { setTimeout(() => {
            App.bot.telegram.deleteMessage(chatId, result.message_id)
        }, 10 * 1000)})
        .catch(err => console.log(err))
});
