const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
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