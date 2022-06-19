const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.hears('🥷admin', ctx => {
    ctx.deleteMessage();
    chatId = ctx.chat.id;
    chatType = ctx.chat.type;
    fromName = ctx.from.first_name;
    // comandi = "<em>questi sono i comandi ad uso esclusivo degli admin</em>: \n<em>/mute 2 (esempio 2 min di mute per l'utente)</em> \n<em>/unmute (toglie il mute)</em> \n<em>/ban (kick utente)</em> \n<em>/unban (toglie il kick )</em>" ;
    if (chatType == 'private'){
        App.bot.telegram.sendMessage(chatId,`
        <em>questi sono i comandi ad uso esclusivo degli admin</em>: 
        \n<em>/mute 2 (esempio 2 min di mute)</em> 
        \n<em>/unmute (toglie il mute)</em> 
        \n<em>/ban (ban per 7 giorni)</em> 
        \n<em>/unban (toglie il ban)</em>
        \n<em>/strike (ammonizione)</em>
        \n<em>/unstrike ( toglie ammonizione)</em>
        ` ,{ parse_mode: "html"})
    }
    else if (chatType == 'supergroup'){
        App.bot.telegram.sendMessage(chatId, `${fromName}\n<em>questo comando non e' attivato in chat pubblica</em>`,{ parse_mode: "html"})
            .then((result) => { setTimeout(() => {
                App.bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
            }, 10 * 1000)})
            .catch(err => console.log(err)) 
    }

    else if (chatType == 'group'){
        App.bot.telegram.sendMessage(chatId, `${fromName}\n<em>questo comando non e' attivato in chat pubblica</em>`,{ parse_mode: "html"})
            .then((result) => { setTimeout(() => {
                App.bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
            }, 10 * 1000)})
            .catch(err => console.log(err)) 
    }

    else if (chatType == 'channel'){
        return;
    }
});
