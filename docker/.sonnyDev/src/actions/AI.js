//const OpenAI = require('openai-nodejs');
//const client = new OpenAI(process.env.OPENAI_SECRET_KEY);
const App = require('/bot/src/settings/app');
const got = require('got');


App.bot.command(`s`,  function(msg) {
  //  msg.deleteMessage();
      console.log("comando @sonny ok");
      chatId = msg.chat.id;
      messageId = msg.message_id;
      fromId = msg.from.id;
      replyId = msg.message.reply_to_message.from.id;
      replyName = msg.message.reply_to_message.from.first_name;
      fromName = msg.from.first_name;
      testo = msg.update.message ;
      son = testo.text.split(' ')[1]; 
     // let prompt = son;
     const chatLog = 'Human: chi ti ha creato?\nAI: il team Microsoft, a Redmond.\nHuman: e quanti anni hai?\nAI: dieci anni.\n' 
     // The new question asked by the user.
     const question = son;
     
     (async () => {
       const url = 'https://api.openai.com/v1/engines/davinci/completions';
       const prompt = `${chatLog}Human: ${question}`;
       const params = {
         'prompt': prompt,
         'max_tokens': 150,
         'temperature': 0.9,
         'frequency_penalty': 0,
         'presence_penalty': 0.6,
         'stop': '\nHuman'
       };
       const headers = {
         'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`,
       };
     
     //  try {
         const response = await got.post(url, { json: params, headers: headers }).json();
         output = `${prompt}${response.choices[0].text}`;
         console.log(output);
         
        App.bot.telegram.getChatMember(chatId, fromId).then(function(data){
          if ((data.status == 'creator')){ setTimeout(() => {
              App.bot.telegram.sendMessage(chatId, `${response.choices[0].text}`); 
            }, 2 * 1000)
          } else {
               App.bot.telegram.sendMessage(chatId,`${fromName}, <em>funzione prossimamente disponibile</em>`,{ parse_mode: "html"});
          }
         
        });   
    //   } catch (err) {
    //     console.log(err); 
    //   } 
     })();
});

