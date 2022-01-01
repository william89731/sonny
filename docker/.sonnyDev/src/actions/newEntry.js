const App = require('/bot/src/settings/app');
const  { Telegraf, Markup,keyboard,  extra } = require('telegraf');

App.bot.on('new_chat_members', (ctx) => {    
  newMember = ctx.message.new_chat_members[0].id;
  newMemberName = ctx.message.new_chat_members[0].first_name;
App.bot.telegram.restrictChatMember(ctx.chat.id, newMember);
App.bot.telegram.sendMessage(ctx.chat.id, `${newMemberName}, premi il pulsante entro 1 min  👇`,
{
    reply_markup:{
        inline_keyboard:[
            [{text:"⚫", callback_data: `enter`}],                
        ]         
    },
});
App.bot.action('enter', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    App.bot.telegram.restrictChatMember(chatId, newMember, {"can_send_messages": true, "can_send_media_messages": true, "can_send_other_messages": true, "can_add_web_page_previews": true});
    App.bot.telegram.sendMessage(chatId, `Ciao ${newMemberName} 😊👋  \n<em>benvenuto/a nel gruppo dedicato alla domotica</em> `,{ parse_mode: "html"});
    App.bot.telegram.sendMessage(chatId ,`👇👇👇👇👇👇👇👇`,
        {
            reply_markup:{
                inline_keyboard:[
                    [{text:"regolamento", url: "https://t.me/regole_domotica_network"}],            
             ]            
            },   
        })              
});


});