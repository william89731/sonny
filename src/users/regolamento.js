const App = require('/bot/settings/app');
const { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.action('regolamento', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    if (ctx.from.username !== undefined) {
        userAlias = `@${ctx.from.username}`;
    } else {
        userAlias = `${ctx.from.id}`;
    }
    App.bot.telegram.sendMessage(chatId, `${userAlias}`,
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "regolamento", url: "https://t.me/regole_domotica_network" }],
                ]
            },
        })
    /*  .then((result) => { setTimeout(() => {
          ctx.telegram.deleteMessage(ctx.chat.id, result.message_id)
      }, 30 * 1000)})
      .catch(err => console.log(err)) */
});