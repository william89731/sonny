const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.hears('🔐 Sicurezza IOT', ctx => {
    ctx.deleteMessage(); 
    let chatId =ctx.chat.id; 
    FromName = ctx.from.first_name,
    App.bot.telegram.sendMessage(chatId , `${FromName}, 👇`,
        {
            reply_markup:{
                inline_keyboard:[
                    [{text:"scan librerie npm", callback_data: 'npm'}],
                    [{text:"scan img docker", url: "https://docs.docker.com/engine/scan/"}],
                    [{text:"scan img docker arm64", url:"https://github.com/shakin89/docker-scan-arm64"}],
                    [{text:"scan log4shell", url: "https://github.com/anchore/grype"}],
                    [{text:"IPS", url: "https://crowdsec.net/"}],
    
            ]            
            },   
        })
        .then((result) => { setTimeout(() => {
            ctx.deleteMessage(chatId, result.message_id)
        }, 300 * 1000)})
        .catch(err => console.log(err))                    
    });
