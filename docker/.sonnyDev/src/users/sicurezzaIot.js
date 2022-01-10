const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.action('sicurezzaIOT',async ctx => {
    ctx.deleteMessage(); 
    let chatId =ctx.chat.id; 
    let FromName = ctx.from.first_name;
    return await ctx.reply( `${FromName}, 👇`,
        {
            reply_markup:{
                inline_keyboard:[
                    [{text:"scan librerie npm", url: "https://docs.npmjs.com/cli/v6/commands/npm-audit"}],
                    [{text:"scan img docker", url: "https://docs.docker.com/engine/scan/"}],
                    [{text:"scan img docker arm64", url:"https://github.com/shakin89/docker-scan-arm64"}],
                    [{text:"scan log4shell", url: "https://github.com/anchore/grype"}],
                    [{text:"IPS", url: "https://crowdsec.net/"}],
                    [{text:"NETDATA", url: "https://www.netdata.cloud/"}],
    
            ]            
            },   
        })
        .then((result) => { setTimeout(() => {
            ctx.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 30 * 1000)})
        .catch(err => console.log(err))                  
    });
