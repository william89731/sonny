const App = require('/bot/settings/app');
const { Telegraf, Markup, keyboard, extra } = require('telegraf');
const Calendar = require('/bot/calendar');
const calendar = new Calendar(App);
//calendar.setDateListener((ctx, date) => ctx.reply(date));

App.bot.action('calendar', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    if (ctx.from.username !== undefined) {
        userAlias = `@${ctx.from.username}`;
    } else {
        userAlias = `${ctx.from.id}`;
    }
    

    ctx.reply(`${userAlias} para que te sirve un calendario? `);

});
    

    

