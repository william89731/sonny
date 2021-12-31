const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.hears('🐈 gitHub', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `${ctx.from.first_name}, 👇`;
    ctx.telegram.sendMessage(chatId ,botReply,
        {
            reply_markup:{
                inline_keyboard:[
                    [{text:"node-red-contrib-crp", url:"https://github.com/william89731/node-red-contrib-crp"}],
                    [{text:"IOT-home-automation", url:"https://github.com/william89731/IOT-home-automation"}],
                    [{text:"node-red-to-google-drive", url:"https://github.com/william89731/node-red-to-google-drive"}],
                    [{text:"Node-red-script-lgtv-python", url:"https://github.com/Dadyy85/Node-red-Alexa-lgtv-python"}],
                    [{text:"House-alarm-with-gateway-xiaomi", url:"https://github.com/william89731/House-alarm-with-gateway-xiaomi"}],
                    [{text:"DS18B20 in node-red", url:"https://github.com/M4M0M3N/DS18B20_node-red"}],
                    [{text:"Wemos d1 mini led rgb", url:"https://github.com/M4M0M3N/ps3_led"}],
                               
                    
                ]         
            },
        
        })
        .then((result) => { setTimeout(() => {
            App.bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 300 * 1000)})
        .catch(err => console.log(err))         
});