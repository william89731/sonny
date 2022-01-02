const axios = require('axios');
const App = require('/bot/src/settings/app');
const appID = process.env.API_OWM;
const weatherEndpoint = (city) => (
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=it&units=metric&&appid=${appID}`
  );
  
  
const weatherIcon = (icon) => `http://openweathermap.org/img/w/${icon}.png`;
  
  
const weatherHtmlTemplate = (name, main, weather, wind, clouds) => (

    `👀: <b>${weather.description} a ${name}</b>\n🌡️: <b>${main.temp} °C</b>\n💧: <b>${main.humidity} %</b>`
  );

const getWeather = (chatId, city) => {
    const endpoint = weatherEndpoint(city);

    axios.get(endpoint).then((resp) => {
    const {
        name,
        main,
        weather,
        wind,
        clouds
    } = resp.data;

//bot.telegram.sendPhoto(chatId, weatherIcon(weather[0].icon))
//        .then((result) => { setTimeout(() => {
//            bot.telegram.deleteMessage(chatId, result.message_id)
//        }, 20 * 1000)})
//        .catch(err => console.log(err))   

App.bot.telegram.sendMessage(
        chatId,
        weatherHtmlTemplate(name, main, weather[0], wind, clouds), {
        parse_mode: "HTML"
        }
    )
            

    App.bot.telegram.sendMessage(
        chatId,
        `Ooops...la tua ricerca ha restituito un errore`, {
        parse_mode: "HTML"
        })
        .then((result) => { setTimeout(() => {
            bot.telegram.deleteMessage(chatId, result.message_id)
        }, 10 * 1000)})
        .catch(err => console.log(err))
    });
}
App.bot.action('meteo', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `${ctx.from.first_name}, 👇 ` ;
    App.bot.telegram.sendMessage(chatId ,botReply,
        {
            reply_markup:{
                inline_keyboard:[
                     [{text:"oggi", callback_data: `oggi`}],
                     [{text:"domani", callback_data: `domani`}],
                     
                    
                ]         
            },
        
        })
        
})

App.bot.action('oggi', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `${ctx.from.first_name}, <em>digitare /oggi e il nome della città</em>`;
    ctx.telegram.sendMessage(chatId ,botReply,{ parse_mode: "html"})
        
        .then((result) => { setTimeout(() => {
            App.bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 10 * 1000)})
        .catch(err => console.log(err))         
});
App.bot.action('domani', ctx => {
    ctx.deleteMessage();
    let chatId = ctx.chat.id;
    let botReply = `${ctx.from.first_name}, <em>funzione non disponibile</em>`;
    ctx.telegram.sendMessage(chatId ,botReply,{ parse_mode: "html"})
        
        .then((result) => { setTimeout(() => {
            App.bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 10 * 1000)})
        .catch(err => console.log(err))         
});
App.bot.command('oggi', msg => {    
    msg.deleteMessage();
    let chatId = msg.chat.id;
    let testo = msg.update.message ;
    let city = testo.text.split(' ')[1];
            
    if (city === undefined) {
    App.bot.telegram.sendMessage(
        chatId,
        `digitare nome città`)
    .then((result) => { setTimeout(() => {
        App.bot.telegram.deleteMessage(chatId, result.message_id)
    }, 30 * 1000)})
    .catch(err => console.log(err))  
    return;
    }
    getWeather(chatId, city);    
});
 
    