const App = require('/bot/settings/app');
const { Telegraf, Markup, keyboard, extra } = require('telegraf');
//const sleep = require('sleep');


App.bot.action('nodered', async ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    if (ctx.from.username !== undefined) {
        userAlias = `@${ctx.from.username}`;
    } else {
        userAlias = `${userAlias}`;
    }
    let botReply = `${userAlias}`;
    ctx.telegram.sendMessage(chatId,
        botReply,
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "nodered.org", url: "https://nodered.org" }],
                    [{ text: "nodered library", url: "https://flows.nodered.org/" }],
                    [{ text: "nodered italia", url: "https://t.me/noderedIT" }],
                    [{ text: "nodered industrial iot", url: "https://t.me/noderedindustrialIot" }],

                ]
            },

        })



    /*  .then((result) => { setTimeout(() => {
           App.bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
       }, 30 * 1000)})
       .catch(err => console.log(err)) */

});