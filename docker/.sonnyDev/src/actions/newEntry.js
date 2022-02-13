const App = require('/bot/src/settings/app');
const  { Telegraf, Markup,keyboard,  extra } = require('telegraf');

App.bot.on('new_chat_members', (ctx) => {
        
    newMember = ctx.message.new_chat_members[0].id;
    newMemberName = ctx.message.new_chat_members[0].first_name;
    /*App.bot.telegram.restrictChatMember(ctx.chat.id, newMember);
    App.bot.telegram.sendMessage(ctx.chat.id, `👇👇`,
    {
        reply_markup:{
            inline_keyboard:[
                [{text:"✅ENTRA✅", callback_data: `enter`}],                
            ]         
        },
    });
    App.bot.action('enter',(ctx) => {
        ctx.deleteMessage();
        let chatId = ctx.chat.id;
        App.bot.telegram.restrictChatMember(chatId, newMember, {"can_send_messages": true, "can_send_media_messages": true, "can_send_other_messages": true, "can_add_web_page_previews": true}); */
        ctx.reply(`Ciao ${newMemberName} 😊👋  \n<em>benvenuto/a nel gruppo dedicato alla domotica.</em>\n<em>Saluta il gruppo e buona permanenza</em> `,{ parse_mode: "html"},Markup
        .keyboard([ 
            ['🤖sonny', '🙎users','🥷admin'],
                ])
        .resize()
        );
        ctx.reply(`👇👇`,
            {
                reply_markup:{
                    inline_keyboard:[
                        [{text:"regolamento", url: "https://t.me/regole_domotica_network"}],            
                ]            
                },   
            })              
        }); 
//});