const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.hears('πusers', async (ctx) => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    if (ctx.from.username !== undefined) {
        userAlias = `@${ctx.from.username}`;
    } else {
        userAlias = `${ctx.from.id}`;
    } 
    
    return await ctx.reply( `${userAlias},π`,
        {
            reply_markup:{
                inline_keyboard:[
                    [{text:"π REGOLAMENTO", callback_data: `regolamento`},{text:"β SEGNALAZIONI", callback_data: `allerte`}],
                    [{text:"π SICUREZZA IOT", callback_data: `sicurezzaIOT`},{text:"π DOCKER", callback_data: `docker`}],
                    [{text:"β KUBERNETES", callback_data: `kubernetes`},{text:"π GITHUB", callback_data: `github`}],
                    [{text:"π  NODERED", callback_data: `nodered`},{text:"ββ ARDUINO", callback_data: `arduino`}],
                    [{text:"π‘ HOME-ASSISTANT", callback_data: `homeassistant`},{text:"ποΈ OPENHAB", callback_data: `openhab`}],
                    [{text:"π CERCA", callback_data: `cerca`},{text:"β METEO", callback_data: `meteo`}], 
                                  
                ]         
            },
        
        })     
});