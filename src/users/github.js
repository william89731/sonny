const App = require('/bot/settings/app');
const { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.action('github', ctx => {
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
                    [{ text: "sonny", url: "https://github.com/william89731/sonny" }],
                    [{ text: "node-red-contrib-crp", url: "https://github.com/william89731/node-red-contrib-crp" }],
                    [{ text: "node-red-contrib-ssh-v3", url: "https://github.com/william89731/node-red-contrib-ssh-v3" }],
                    [{ text: "traefik-service-dockerized", url: "https://github.com/william89731/traefik-service-dockerized" }],
                    [{ text: "Nodered Nodes Updater", url: "https://github.com/william89731/nodered-nodes-updater" }],
                    [{ text: "Docker containers home assistant supervised", url: "https://github.com/william89731/docker-containers-home-assistant-supervised-" }],
                    [{ text: "IOT-home-automation", url: "https://github.com/william89731/IOT-home-automation" }],
                    [{ text: "node-red-to-google-drive", url: "https://github.com/william89731/node-red-to-google-drive" }],
                    [{ text: "Node-red-script-lgtv-python", url: "https://github.com/Dadyy85/Node-red-Alexa-lgtv-python" }],
                    [{ text: "House-alarm-with-gateway-xiaomi", url: "https://github.com/william89731/House-alarm-with-gateway-xiaomi" }],





                ]
            },

        })
    /*   .then((result) => { setTimeout(() => {
           App.bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
       }, 30 * 1000)})
       .catch(err => console.log(err)) */
});