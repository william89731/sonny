try {
const App = require('/bot/settings/app');
const { Telegraf, Markup, keyboard, extra } = require('telegraf');

App.bot.on('new_chat_members', (ctx) => {
    newMember = ctx.message.new_chat_members[0].id;
    newMemberName = ctx.message.new_chat_members[0].first_name;
    App.bot.telegram.restrictChatMember(ctx.chat.id, newMember);
    if (ctx.from.username !== undefined) {
        userAlias = `@${ctx.from.username}`;
    } else {
        userAlias = `${ctx.from.id}`;
    }
    //ctx.reply(`${userAlias} \n<em>Premi il pulsante "entra" per smutarti.</em>\n<em>In caso di necessità contattare gli amministratori.</em>\n<em>Questo messaggio si autodistruggerà entro 1 min.</em>`,{ parse_mode: "html"});
    App.bot.telegram.sendMessage(ctx.chat.id, ` 
    ${userAlias} 
    \nPremi il pulsante "entra" per smutarti 
    \nIn caso di necessità contattare gli amministratori
    \nQuesto messaggio si autodistruggerà entro 1 min`,
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "✅ENTRA✅", callback_data: `enter` }],
                ]
            },
        })
        
        .then((result) => {
            setTimeout(() => {
                ctx.deleteMessage
            }, 60 * 1000)
        })
        .catch(err => console.log(err));

    App.bot.action('enter', (ctx) => {
        ctx.deleteMessage();
        let chatId = ctx.chat.id;
        if (ctx.from.username == undefined) {
            App.bot.telegram.restrictChatMember(chatId, newMember, { "can_send_messages": false, "can_send_media_messages": false, "can_send_other_messages": false, "can_add_web_page_previews": false });
            ctx.reply(`
            ${userAlias}
            ❗❗
            \n<em>imposta uno username e contatta l'amministratore per essere abilitato alla chat</em>`,{ parse_mode: "html" });
        }
        else {
        App.bot.telegram.restrictChatMember(chatId, newMember, { "can_send_messages": true, "can_send_media_messages": true, "can_send_other_messages": true, "can_add_web_page_previews": true });
        ctx.reply(`Ciao ${userAlias} 😊👋  \n<em>benvenuto/a nel gruppo dedicato alla domotica.</em>\n<em>Saluta il gruppo e buona permanenza</em> `, { parse_mode: "html" },
            Markup
                .keyboard([
                    ['🤖sonny', '🙎users', '🥷admin'],
                ])
                .resize()
        );
        ctx.reply(`${userAlias}`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "regolamento", url: "https://t.me/regole_domotica_network" }],
                    ]
                },
            }
        )
        }
    });
});
}
catch (e) {
  console.log(e);
}