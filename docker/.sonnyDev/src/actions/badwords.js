const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
const FS = require('fs');
const Readline = require('readline');
const WORDS = [];

async function processLineByLine() {
  const fileStream = FS.createReadStream('/bot/src/settings/badwords.txt', 'utf8');

  const rl = Readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    WORDS.push( line.toLowerCase() );
  }
}
processLineByLine();
App.bot.on('message', (ctx) => {
    let text = ctx.update.message.text 
    let words = text.toLowerCase().split(' ');
    for ( let word of words) {
        if ( WORDS.indexOf(word) > -1 ) {
            // bad word found!
            console.log( word, 'has been found in the message!');
            ctx.deleteMessage();
          //  bot.telegram.sendMessage(msg.chat.id,`❌`);
            App.bot.telegram.sendMessage(ctx.chat.id,`${ctx.from.first_name}, ⛔ \n<em>Hai usato un termine presente in blackList!</em>`,{ parse_mode: "html"})
            break;
        }
    }
});