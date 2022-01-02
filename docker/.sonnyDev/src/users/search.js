const App = require('/bot/src/settings/app');
const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
App.bot.hears('🔍cerca', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `${ctx.from.first_name},scegli il motore:`;                   
    ctx.telegram.sendMessage(chatId ,botReply,
        {
            reply_markup:{
                inline_keyboard:[
                    [{text:"duckduckgo", callback_data: `duckduckgo`}],            
                    [{text:"google", callback_data: `google`}],
                    [{text:"nodered", callback_data: `node`}],
                    [{text:"wikipedia", callback_data: `wiki`}], 
                ]         
            },
        
        })
         
          
});
App.bot.action('duckduckgo', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `<em>digita /duck e il testo da cercare</em>` ;
    ctx.telegram.sendMessage(chatId ,botReply,{ parse_mode: "html"}) 
        .then((result) => { setTimeout(() => {
            ctx.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 10 * 1000)})
        .catch(err => console.log(err))
});
App.bot.action('google', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `<em>digita /google e il testo da cercare</em>` ;
    ctx.telegram.sendMessage(chatId ,botReply,{ parse_mode: "html"}) 
        .then((result) => { setTimeout(() => {
            ctx.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 10 * 1000)})
        .catch(err => console.log(err))
});
App.bot.action('node', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `<em>digita /node e il testo da cercare</em>` ;
    ctx.telegram.sendMessage(chatId ,botReply,{ parse_mode: "html"}) 
        .then((result) => { setTimeout(() => {
            ctx.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 10 * 1000)})
        .catch(err => console.log(err))
});
App.bot.action('wiki', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `<em>digita /wiki e il testo da cercare</em>` ;
    ctx.telegram.sendMessage(chatId ,botReply,{ parse_mode: "html"}) 
        .then((result) => { setTimeout(() => {
            ctx.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 10 * 1000)})
        .catch(err => console.log(err))
});
App.bot.command('duck', (ctx) => { 
    ctx.deleteMessage()        
    let chatId = ctx.chat.id;
    let cerca = ctx.update.message.text.split(' ')[1];
    let link = `https://duckduckgo.com/?q=${cerca}`
    ctx.telegram.sendMessage(chatId,`${ctx.from.first_name}, 👇`,
     {
        reply_markup:{
            inline_keyboard:[
                [{text:"duckduckgo", url: link}],            
         ]            
        },   
    })           
    .then((result) => { setTimeout(() => {
        ctx.telegram.deleteMessage(ctx.chat.id, result.message_id)
    }, 300 * 1000)})
    .catch(err => console.log(err))                   
});
App.bot.command('google', (ctx) => { 
    ctx.deleteMessage()        
    let chatId = ctx.chat.id;
    let cerca = ctx.update.message.text.split(' ')[1];
    let link2 = `https://google.it/search?q=${cerca}`
    ctx.telegram.sendMessage(chatId,`${ctx.from.first_name}, 👇`,
     {
        reply_markup:{
            inline_keyboard:[
                [{text:"google", url: link2}],            
         ]            
        },   
    })           
    .then((result) => { setTimeout(() => {
        ctx.telegram.deleteMessage(ctx.chat.id, result.message_id)
    }, 300 * 1000)})
    .catch(err => console.log(err))                   
});
App.bot.command('node', (ctx) => { 
    ctx.deleteMessage()        
    let chatId = ctx.chat.id;
    let cerca = ctx.update.message.text.split(' ')[1];
    let link3 = `https://flows.nodered.org/search?term=${cerca}`
    ctx.telegram.sendMessage(chatId,`${ctx.from.first_name}, 👇`,
     {
        reply_markup:{
            inline_keyboard:[
                [{text:"flows", url: link3}],            
         ]            
        },   
    })           
    .then((result) => { setTimeout(() => {
        ctx.telegram.deleteMessage(ctx.chat.id, result.message_id)
    }, 300 * 1000)})
    .catch(err => console.log(err))                   
});
App.bot.command('wiki', (ctx) => { 
    ctx.deleteMessage()        
    let chatId = ctx.chat.id;
    let cerca = ctx.update.message.text.split(' ')[1];
    let link4 = `https://it.wikipedia.org/wiki/${cerca}`
    ctx.telegram.sendMessage(chatId,`${ctx.from.first_name}, 👇`,
     {
        reply_markup:{
            inline_keyboard:[
                [{text:"wikipedia", url: link4}],            
         ]            
        },   
    })           
    .then((result) => { setTimeout(() => {
        ctx.telegram.deleteMessage(ctx.chat.id, result.message_id)
    }, 300 * 1000)})
    .catch(err => console.log(err))                   
});