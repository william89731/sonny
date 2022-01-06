//const OpenAI = require('openai-nodejs');
//const client = new OpenAI(process.env.OPENAI_SECRET_KEY);
const App = require('/bot/src/settings/app');
const got = require('got');


App.bot.command('/s',  function(msg) {
    //  msg.deleteMessage();
      console.log("comando @sonny ok");
  let    chatId = msg.chat.id;
  //   messageId = msg.message_id;
  let    fromId = msg.from.id;
  //   replyId = msg.message.reply_to_message.from.id;
  //   replyName = msg.message.reply_to_message.from.first_name; */
  let    fromName = msg.from.first_name;
  let    testo = msg.update.message ;
  let    son = testo.text.split(' '); 
     const chatLog = 'Human: ciao,chi sei?\n\nAI: sono un giovane e amichevole assistente.\n' 
     // The new question asked by the user.
     const question = testo;
     
     (async () => {
       const url = 'https://api.openai.com/v1/engines/davinci/completions';
       const prompt = `${chatLog}Human: ${question}`;
       const params = {
         'prompt': prompt,
         'max_tokens': 60,
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
          if ((data.status == 'creator')){ 
            
              App.bot.telegram.sendMessage(chatId, `${response.choices[0].text}`); 
            
          } else {
               App.bot.telegram.sendMessage(chatId,`${fromName}, <em>funzione prossimamente disponibile</em>`,{ parse_mode: "html"});
          }
         
        });   
    //   } catch (err) {
    //     console.log(err); 
    //   } 
     })();
});

