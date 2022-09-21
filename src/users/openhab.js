const App = require('/bot/settings/app');
const { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.action('openhab', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    if (ctx.from.username !== undefined) {
        userAlias = `@${ctx.from.username}`;
    } else {
        userAlias = `${userAlias}`;
    }
    let botReply = `${userAlias}`;
    ctx.telegram.sendMessage(chatId, botReply,
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "openhab.org", url: "https://www.openhab.org" }],


                ]
            },

        })
    /*  .then((result) => { setTimeout(() => {
          App.bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
      }, 30 * 1000)})
      .catch(err => console.log(err)) */
});