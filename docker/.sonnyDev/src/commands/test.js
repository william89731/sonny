const App = require('/bot/src/settings/app');
const ms = require('ms');
App.bot.command('eu', context=> {
    msg=context.update.message
importo=msg.text.split(' ')[1]

context.reply(`${importo}`)
})