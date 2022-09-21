const App = require('/bot/src/settings/app');
const  { Telegraf, Markup,keyboard,  extra } = require('telegraf');

App.bot.on('new_chat_members', (ctx) => {
  App.bot.telegram.sendMessage(ctx.chat.id,`<em>Prima di entrare nel gruppo, dimostra che non sei un bot</em>`,{ parse_mode: "html"})  
  newMember = ctx.message.new_chat_members[0].id;
  newMemberName = ctx.message.new_chat_members[0].first_name;
  
  App.bot.telegram.restrictChatMember(ctx.chat.id, newMember);
  const quest =  Markup.inlineKeyboard([
      Markup.button.callback('sono un bot', 'errore'),
      Markup.button.callback('sono un umano', 'Pass'),
    ])
      
  
  App.bot.telegram.sendMessage(ctx.chat.id,`👇👇`, quest).then(
        ({ message_id }) => { spamBlocker = message_id; });      
});


App.bot.on("callback_query", function(callbackQuery) {
  let chatID = callbackQuery.update.callback_query.message.chat.id;
 // let welcomeMessage = 'Benvenuto/a nel gruppo dedicato alla domotica 😊';
  if (callbackQuery.update.callback_query.data == "Pass") {
    App.bot.telegram.deleteMessage(chatID, spamBlocker);
    App.bot.telegram.restrictChatMember(chatID, newMember, {"can_send_messages": true, "can_send_media_messages": true, "can_send_other_messages": true, "can_add_web_page_previews": true});
    App.bot.telegram.sendMessage(chatID,`
    Benvenuto/a nel gruppo dedicato alla domotica 😊`,{ parse_mode: "html"});
    App.bot.telegram.sendMessage(chatID,`👇👇`,
      {
          reply_markup:{
              inline_keyboard:[
                  [{text:"regolamento", url: "https://t.me/regole_domotica_network"}],            
           ]            
          },   
      })  
  }else{
    App.bot.telegram.kickChatMember(chatID, newMember);
    App.bot.telegram.deleteMessage(chatID, spamBlocker);
   
  }
});  
