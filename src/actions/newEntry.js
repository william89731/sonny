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
        };

        ctx.reply(` 
            ${userAlias} 
            \nPremi il pulsante "entra" entro 20 secondi
            \nIn caso di necessità contattare gli amministratori`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "✅ENTRA✅", callback_data: `enter` }],
                    ]
                },
            }
        ).then((result) => {
            setTimeout(() => {
                ctx.telegram.deleteMessage(ctx.chat.id, result.message_id)
            }, 20 * 1000)
        })
            .catch(err => console.log(err))


        App.bot.action('enter', (ctx) => {
            ctx.deleteMessage();
            let chatId = ctx.chat.id;
            if (ctx.from.username == undefined) {
                App.bot.telegram.restrictChatMember(chatId, newMember, { "can_send_messages": false, "can_send_media_messages": false, "can_send_other_messages": false, "can_add_web_page_previews": false });
                ctx.reply(`
                    ${userAlias}  ❗❗
                    \n Sei stato disabilitato all'uso della chat 
                    \nImposta uno username e conferma `,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: "✅CONFERMA✅", callback_data: `conferma` }],
                            ]
                        },
                    }
                );
                App.bot.action('conferma', (ctx) => {
                    ctx.deleteMessage();
                    if (ctx.from.username == undefined) {
                        App.bot.telegram.restrictChatMember(chatId, newMember, { "can_send_messages": false, "can_send_media_messages": false, "can_send_other_messages": false, "can_add_web_page_previews": false });
                        ctx.reply(`${userAlias}  ❗❗
                        \nSei stato disabilitato all'uso della chat 
                        \nContatta gli amministratori`);
                    } else {
                        if (ctx.from.username !== undefined) {
                            NewUserAlias = `@${ctx.from.username}`;
                        }
                        App.bot.telegram.restrictChatMember(chatId, newMember, { "can_send_messages": true, "can_send_media_messages": true, "can_send_other_messages": true, "can_add_web_page_previews": true });
                        ctx.reply(`Ciao ${NewUserAlias} 😊👋  \nbenvenuto/a nel gruppo dedicato alla domotica.\nSaluta il gruppo e buona permanenza`,
                            Markup
                                .keyboard([
                                    ['🤖sonny', '🙎users', '🥷admin'],
                                ])

                                .resize()
                        );

                        setTimeout(() => {
                            ctx.reply(`${NewUserAlias}`,
                                {
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{ text: "regolamento", url: "https://t.me/regole_domotica_network" }],
                                        ]
                                    },
                                }
                            )
                        }, 1 * 1000);

                    }

                });


            }
            else {
                App.bot.telegram.restrictChatMember(chatId, newMember, { "can_send_messages": true, "can_send_media_messages": true, "can_send_other_messages": true, "can_add_web_page_previews": true });
                ctx.reply(`Ciao ${userAlias} 😊👋  \nbenvenuto/a nel gruppo dedicato alla domotica.\nSaluta il gruppo e buona permanenza`,
                    Markup
                        .keyboard([
                            ['🤖sonny', '🙎users', '🥷admin'],
                        ])
                        .resize()
                );
                setTimeout(() => {
                    ctx.reply(`${userAlias}`,
                        {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "regolamento", url: "https://t.me/regole_domotica_network" }],
                                ]
                            },
                        }
                    )
                }, 1 * 1000);
            }
        });
    }); //new member
}
catch (e) {
    console.log(e);
}