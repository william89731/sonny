const App = require('/bot/settings/app');
const { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.action('homeassistant', ctx => {
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
                    [{ text: "home-assistant.io", url: "https://www.home-assistant.io" }],
                    [{ text: "home-assistant blog", url: "https://www.home-assistant.io/blog/" }],


                ]
            },

        })
    /*    .then((result) => { setTimeout(() => {
            App.bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 30 * 1000)})
        .catch(err => console.log(err))  */
});