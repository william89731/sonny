const App = require('/bot/src/settings/app');
const  { Telegraf, Markup,keyboard,  extra } = require('telegraf');

App.bot.on('new_chat_members', (ctx) => {
    
  newMember = ctx.message.new_chat_members[0].id;
  newMemberName = ctx.message.new_chat_members[0].first_name;
  
  App.bot.telegram.restrictChatMember(ctx.chat.id, newMember);
  const keyboard =  Markup.inlineKeyboard([
      Markup.button.callback('2+1=101', 'errore'),
      Markup.button.callback('3+4=7', 'Pass'),
      Markup.button.callback('5+3=64', 'errore'),
    ])
      
  App.bot.telegram.sendMessage(ctx.chat.id, `${newMemberName}\nQuale operazione e' vera? `, keyboard).then(
        ({ message_id }) => { spamBlocker = message_id; });
});

App.bot.on("callback_query", function(callbackQuery) {
  let chatID = callbackQuery.update.callback_query.message.chat.id;
  let welcomeMessage = 'Benvenuto/a nel gruppo dedicato alla domotica 😊';
  if (callbackQuery.update.callback_query.data == "Pass") {
    App.bot.telegram.deleteMessage(chatID, spamBlocker);
    App.bot.telegram.restrictChatMember(chatID, newMember, {"can_send_messages": true, "can_send_media_messages": true, "can_send_other_messages": true, "can_add_web_page_previews": true});
    App.bot.telegram.sendMessage(chatID, `${welcomeMessage}`)
    App.bot.telegram.sendMessage(chatID,`${newMemberName} 👇`,
      {
          reply_markup:{
              inline_keyboard:[
                  [{text:"regolamento", url: "https://t.me/regole_domotica_network"}],            
           ]            
          },   
      })  
  }
  
  if (callbackQuery.update.callback_query.data == "error"  ) {
    App.bot.telegram.kickChatMember(chatID, newMember);
    App.bot.telegram.deleteMessage(chatID, spamBlocker);
  }
  if (callbackQuery.update.callback_query.data == null  ) {
    setTimeout(() => {
    App.bot.telegram.kickChatMember(chatID, newMember);
    App.bot.telegram.deleteMessage(chatID, spamBlocker);
    }, 10 * 1000)
  }
});  
