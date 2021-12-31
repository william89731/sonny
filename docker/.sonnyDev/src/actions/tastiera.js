const path = require('path'); 
console.log("dir",__dirname);
const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
//const Code = ( process.env.CODE );
App.bot.hears(process.env.CODE, async (ctx) => {
    ctx.deleteMessage();
    console.log("comando tastiera eseguito");
    return await ctx.reply(`ready`,App.Markup
    .keyboard([ 
        ['🤖sonny','📜 regolamento', '🔍 cerca'],  
        ['😎 matrix','⛅ meteo','🐈 gitHub' ], 
        ['🏠 nodeRed','🏡 homeAssistant', '🏘️ openHab'],
        ['🔐 Sicurezza IOT','🥷 admin'],  
    ])
    .oneTime()
    .resize()
)
}) ; 
       

//SICUREZZA IOT
/*App.bot.hears('🔐 Sicurezza IOT', async (ctx) => {
ctx.deleteMessage(); 
let chatId =ctx.chat.id; 
return await App.bot.telegram.sendMessage(chatId , `${ctx.from.first_name}, 👇`,
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
App.bot.action('npm', ctx => {
ctx.deleteMessage();
let chatId = ctx.chat.id;
let botReply = `<em>nella directory del tuo progetto, digita "npm audit"</em>` ;
ctx.reply(chatId ,botReply, { parse_mode: "html"}) 
    .then((result) => { setTimeout(() => {
        ctx.deleteMessage(ctx.chat.id, result.message_id)
    }, 15 * 1000)})
    .catch(err => console.log(err))
}); */ 

/*//ADMIN
App.bot.hears('🥷 admin', ctx => {
    ctx.deleteMessage();
    chatId = ctx.chat.id;
    chatType = ctx.chat.type;
    fromName = ctx.from.first_name;
    comandi = "<em>questi sono i comandi per  il bot</em>: \n<em>/mute 2 (esempio 2 min di mute per l'utente)</em> \n<em>/unmute (toglie il mute)</em> \n<em>/ban (kick utente)</em> \n<em>/unban (toglie il kick )</em>" ;
    if (chatType == 'private'){
        App.bot.telegram.sendMessage(chatId, comandi,{ parse_mode: "html"})
    }
    else if (chatType == 'supergroup'){
        App.bot.telegram.sendMessage(chatId, `${fromName}\n<em>questo comando non e' attivato in chat pubblica</em>`,{ parse_mode: "html"})
        .then((result) => { setTimeout(() => {
            App.bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 10 * 1000)})
        .catch(err => console.log(err)) 
    }

    else if (chatType == 'group'){
        App.bot.telegram.sendMessage(chatId, `${fromName}\n<em>questo comando non e' attivato in chat pubblica</em>`,Html)
        .then((result) => { setTimeout(() => {
            App.bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 10 * 1000)})
        .catch(err => console.log(err)) 
    }

    else if (chatType == 'channel'){
        return;
    }
});*/

/*//GITHUB
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
}); */

/*//NODERED
App.bot.hears('🏠 nodeRed', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `${ctx.from.first_name}, 👇`;
    ctx.telegram.sendMessage(chatId ,botReply,
        {
            reply_markup:{
                inline_keyboard:[
                     [{text:"nodered.org", url:"https://nodered.org"}],
                     [{text:"nodered library", url:"https://flows.nodered.org/"}],
                     [{text:"nodered italia", url:"https://t.me/noderedIT"}],
                     [{text:"nodered industrial iot", url:"https://t.me/noderedindustrialIot"}],           
                    
                ]         
            },
        
        })
        .then((result) => { setTimeout(() => {
            App.bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 300 * 1000)})
        .catch(err => console.log(err))         
});  */

/*//homeAssistant
App.bot.hears('🏡 homeAssistant', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `${ctx.from.first_name}, 👇`;
    ctx.telegram.sendMessage(chatId ,botReply,
        {
            reply_markup:{
                inline_keyboard:[
                    [{text:"home-assistant.io", url:"https://www.home-assistant.io"}],
                    [{text:"home-assistant blog", url:"https://www.home-assistant.io/blog/"}],
                             
                    
                ]         
            },
        
        })
        .then((result) => { setTimeout(() => {
            App.bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 300 * 1000)})
        .catch(err => console.log(err))         
}); */

/*//openhab
App.bot.hears('🏘️ openHab', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `${ctx.from.first_name}, 👇`;
    ctx.telegram.sendMessage(chatId ,botReply,
        {
            reply_markup:{
                inline_keyboard:[
                    [{text:"openhab.org", url:"https://www.openhab.org"}],
                             
                    
                ]         
            },
        
        })
        .then((result) => { setTimeout(() => {
            App.bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 300 * 1000)})
        .catch(err => console.log(err))         
}); */

/*//RICERCA 
App.bot.hears('🔍 cerca', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `${ctx.from.first_name},scegli il motore:`;                   
    ctx.telegram.sendMessage(chatId ,botReply,
        {
            reply_markup:{
                inline_keyboard:[
                    [{text:"duckduckgo", callback_data: `duckduckgo`}],            
                  [{text:"google", callback_data: `google`}], 
                ]         
            },
        
        })
         
          
});
App.bot.action('duckduckgo', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `<em>digita /duck e il testo da cercare</em>` ;
    ctx.telegram.sendMessage(chatId ,botReply,{ parse_mode: "html"}) 
        .then((result) => { setTimeout(() => {
            ctx.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 10 * 1000)})
        .catch(err => console.log(err))
})
App.bot.action('google', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `<em>digita /google e il testo da cercare</em>` ;
    ctx.telegram.sendMessage(chatId ,botReply,{ parse_mode: "html"}) 
        .then((result) => { setTimeout(() => {
            ctx.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 10 * 1000)})
        .catch(err => console.log(err))
})
App.bot.command('duck', (ctx) => { 
    ctx.deleteMessage()        
    let chatId = ctx.chat.id;
    let cerca = ctx.update.message.text.split(' ')[1];
    let link = `https://duckduckgo.com/?q=${cerca}`
    ctx.telegram.sendMessage(chatId,`${ctx.from.first_name}, 👇`,
     {
        reply_markup:{
            inline_keyboard:[
                [{text:"duckduckgo", url: link}],            
         ]            
        },   
    })           
    .then((result) => { setTimeout(() => {
        ctx.telegram.deleteMessage(ctx.chat.id, result.message_id)
    }, 300 * 1000)})
    .catch(err => console.log(err))                   
})
App.bot.command('google', (ctx) => { 
    ctx.deleteMessage()        
    let chatId = ctx.chat.id;
    let cerca = ctx.update.message.text.split(' ')[1];
    let link2 = `https://google.it/search?q=${cerca}`
    ctx.telegram.sendMessage(chatId,`${ctx.from.first_name}, 👇`,
     {
        reply_markup:{
            inline_keyboard:[
                [{text:"google", url: link2}],            
         ]            
        },   
    })           
    .then((result) => { setTimeout(() => {
        ctx.telegram.deleteMessage(ctx.chat.id, result.message_id)
    }, 300 * 1000)})
    .catch(err => console.log(err))                   
}) */

//ATTIVAZIONE BOT
/*App.bot.hears('🤖 sonny', msg => {
    msg.deleteMessage();
    let chatId = msg.chat.id;
        let botReply2 = `_HEY,ciao_!  ${msg.from.first_name} \n<em>Sono il tuo amichevole bot di quartiere</em> ☺️`;
        App.bot.telegram.sendMessage(chatId ,botReply2,{ parse_mode: "html"}) 
            .then((result) => { setTimeout(() => {
                App.bot.telegram.deleteMessage(chatId, result.message_id)
            }, 15 * 1000)})
            .catch(err => console.log(err))      
});*/

/*//REGOLE
App.bot.hears('📜 regolamento', ctx => {
    ctx.deleteMessage();
    let chatId =ctx.chat.id;
    App.bot.telegram.sendMessage(chatId , `${ctx.from.first_name}, 👇`,
        {
            reply_markup:{
                inline_keyboard:[
                    [{text:"regolamento", url: "https://t.me/regole_domotica_network"}],            
             ]            
            },   
        })           
        .then((result) => { setTimeout(() => {
            ctx.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 300 * 1000)})
        .catch(err => console.log(err))       
});

// MATRIX
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
});*/



