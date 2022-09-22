const App = require('/bot/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.hears('🙎users', async (ctx) => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    if (ctx.from.username !== undefined) {
        userAlias = `@${ctx.from.username}`;
    } else {
        userAlias = `${ctx.from.id}`;
    } 
    
    return await ctx.reply( `${userAlias}`,
        {
            reply_markup:{
                inline_keyboard:[
                    [{text:"📜 REGOLAMENTO", callback_data: `regolamento`},{text:"❗ SEGNALAZIONI", callback_data: `allerte`}],
                    [{text:"🔐 SICUREZZA IOT", callback_data: `sicurezzaIOT`},{text:"🐋 DOCKER", callback_data: `docker`}],
                    [{text:"⚓ KUBERNETES", callback_data: `kubernetes`},{text:"🐈 GITHUB", callback_data: `github`}],
                    [{text:"🏠 NODERED", callback_data: `nodered`},{text:"➖➕ ARDUINO", callback_data: `arduino`}],
                    [{text:"🏡 HOME-ASSISTANT", callback_data: `homeassistant`},{text:"🏘️ OPENHAB", callback_data: `openhab`}],
                    [{text:"🎫 RELEASE", callback_data: `release`},{text:"⛅ METEO", callback_data: `meteo`}],
                    [{text:"🔍 CERCA", callback_data: `cerca`},{text:" ", callback_data: ` `}],
                              
                ]         
            },
        
        })     
});