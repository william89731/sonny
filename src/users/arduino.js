const App = require('/bot/settings/app');
const { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.action('arduino', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    if (ctx.from.username !== undefined) {
        userAlias = `@${ctx.from.username}`;
    } else {
        userAlias = `${ctx.from.id}`;
    }
    let botReply = `${userAlias}`;
    ctx.telegram.sendMessage(chatId, botReply,
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "arduino.cc", url: "https://www.arduino.cc/" }],



                ]
            },

        })
    /*   .then((result) => { setTimeout(() => {
            App.bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 30 * 1000)})
        .catch(err => console.log(err)) */
});