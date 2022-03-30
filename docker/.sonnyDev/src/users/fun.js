const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.action('fun', ctx => {
  ctx.deleteMessage();
  let chatId = ctx.chat.id;
  ctx.telegram.sendMessage(chatId ,`per i tuoi momenti di svago:
      \n/dado - se vuoi lanciare una dado
      \n/dardo - quando vuoi centrare qualcuno in un occhio
      \n/immagini - (prossimamente)
      `
      )
      .then((result) => { setTimeout(() => {
          App.bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
      }, 30 * 1000)})
      .catch(err => console.log(err))         
});
App.bot.command(`dardo`, (ctx) => {
    const opts = {
        'emoji': '🎯'
    }
    App.bot.telegram.sendDice(ctx.chat.id, opts);
  });

App.bot.command(`dado`, (ctx) => {
    App.bot.telegram.sendDice(ctx.chat.id);
  }); 
