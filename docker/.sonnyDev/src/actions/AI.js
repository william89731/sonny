const App = require('/bot/src/settings/app');
const got = require('got');
App.bot.command('sonny',  function(msg) {
  console.log("IA attivato ");
  chatId = msg.chat.id; 
  fromId = msg.from.id; 
  fromName = msg.from.first_name;    
  App.bot.telegram.getChatMember(chatId, fromId).then(function(data){
     //   if ((data.status == 'creator')){ 
        const message = msg.message.text.split(' ');
        message.shift();
        question = message.join(' ');
        console.log(question);
        const chatLog = 'Human: ciao,chi sei?\n\nAI: sono il tuo amichevole bot di quartiere.cosa posso fare per te oggi?\n' ;
        (async () => {
        const url = 'https://api.openai.com/v1/engines/davinci/completions';
        const prompt = `${chatLog}Human: ${question}`;
        const params = {
          'prompt': prompt,
          'max_tokens': 80,
          'temperature': 0.7,
          'frequency_penalty': 0,
          'presence_penalty': 0.6,
          'stop': '\nHuman'
        };
        const headers = {
          'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`,
        };
        const response = await got.post(url, { json: params, headers: headers }).json();
          output = `${prompt}${response.choices[0].text}`;
          console.log(output)
        msg.reply(`${response.choices[0].text}`);  
        })();
 
     //   } else {
     //     App.bot.telegram.sendMessage(chatId,`${fromName}, <em>funzione prossimamente disponibile</em>`,{ parse_mode: "html"});
     //   }   
      });      
});
 
 