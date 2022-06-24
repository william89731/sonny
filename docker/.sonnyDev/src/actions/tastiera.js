const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.hears(process.env.CODE, async (ctx) => {
    ctx.deleteMessage();
    console.log("comando tastiera eseguito");
    return await ctx.reply(`ready`,Markup
        .keyboard([ 
            ['🤖sonny', '🙎users','🥷admin'],
        ])

        .resize()

    )


}) ; 






