const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.hears('🙎users', async (ctx) => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `${ctx.from.first_name}, 👇`;
    return await ctx.reply( botReply,
        {
            reply_markup:{
                inline_keyboard:[
                    [{text:"📜 REGOLAMENTO", callback_data: `regolamento`},{text:"❗ SEGNALAZIONI", callback_data: `allerte`}],
                    [{text:"🔐 SICUREZZA IOT", callback_data: `sicurezzaIOT`},{text:"🐋 DOCKER", callback_data: `docker`}],
                    [{text:"⚓ KUBERNETES", callback_data: `kubernetes`},{text:"🐈 GITHUB", callback_data: `github`}],
                    [{text:"🏠 NODERED", callback_data: `nodered`},{text:"➖➕ ARDUINO", callback_data: `arduino`}],
                    [{text:"🏡 HOME-ASSISTANT", callback_data: `homeassistant`},{text:"🏘️ OPENHAB", callback_data: `openhab`}],
                    [{text:"🔍 CERCA", callback_data: `cerca`},{text:"⛅ METEO", callback_data: `meteo`}], 
                    

                /*    [{text:"🐈 GITHUB", callback_data: `github`},{text:"🏠 NODERED", callback_data: `nodered`}],           
                    [{text:"➖➕ ARDUINO", callback_data: `arduino`},{text:"🏡 HOME-ASSISTANT", callback_data: `homeassistant`}],       
                    [{text:"🏘️ OPENHAB", callback_data: `openhab`},{text:"🔍 CERCA", callback_data: `cerca`}], 
                    [{text:"⛅ METEO", callback_data: `meteo`}],*/

                    
                    
                      

                               
                    
                ]         
            },
        
        })
        
        /*.then((result) =>  {setTimeout(() => {
            
           App.bot.telegram.deleteMessage(ctx.chat.id, result.message_id,(err, data) => {
                if (err) throw err;
                console.log(data);
                if (result.message_id == undefined){
                    return;
                }

              }) 
               
        }, 10 * 1000)}) */
        
          
        
                        
         
});