const App = require('/bot/settings/app');
const { Telegraf, Markup, keyboard, extra } = require('telegraf');
const axios = require('axios');

App.bot.action('release', ctx => {
  ctx.deleteMessage();
  let chatId = ctx.chat.id;
  let docker_compose = "https://api.github.com/repos/docker/compose/releases/latest"
  let homeassistant = "https://api.github.com/repos/home-assistant/core/releases/latest"
  let homeassistant_supervisor = "https://api.github.com/repos/home-assistant/operating-system/releases/latest"
  let zigbee2mqtt = "https://api.github.com/repos/Koenkk/zigbee2mqtt/releases/latest"
  let mosquitto = "https://api.github.com/repos/eclipse/mosquitto/tags"
  let nodered = "https://api.github.com/repos/node-red/node-red/releases/latest"
  let portainer = "https://api.github.com/repos/portainer/portainer/releases/latest"
  let openhab = "https://api.github.com/repos/openhab/openhab-core/tags"
  let nginx = "https://api.github.com/repos/nginx/nginx/tags"

  const requestDocker_compose = axios.get(docker_compose);
  const requestHomeassistant = axios.get(homeassistant);
  const requestHomeassistantSupervisor = axios.get(homeassistant_supervisor);
  const requestZigbee2mqtt = axios.get(zigbee2mqtt);
  const requestMosquitto = axios.get(mosquitto);
  const requestNodered = axios.get(nodered);
  const requestPortainer = axios.get(portainer);
  const requestOpenhab = axios.get(openhab);
  const requestNginx = axios.get(nginx);

  axios.all([requestDocker_compose, requestHomeassistant, requestZigbee2mqtt, requestHomeassistantSupervisor, requestMosquitto, requestNodered, requestPortainer, requestOpenhab, requestNginx]).then(axios.spread((...responses) => {
    const responseDocker_compose = responses[0];
    const responseHomeassistant = responses[1];
    const responseZigbee2mqtt = responses[2];
    const responseHomeassistantSupervisor = responses[3];
    const responseMosquitto = responses[4];
    const responseNodered = responses[5];
    const responsePortainer = responses[6];
    const responseOpenhab = responses[7];
    const responseNginx = responses[8];

    console.log(responseDocker_compose.data.tag_name, responseHomeassistant.data.tag_name, responseZigbee2mqtt.data.tag_name, responseHomeassistantSupervisor.data.tag_name, responseMosquitto.data[0].name, responseNodered.data.tag_name, responsePortainer.data.tag_name, responseOpenhab.data[0].name, responseNginx.data[0].name);
    if (ctx.from.username !== undefined) {
      userAlias = `@${ctx.from.username}`;
    } else {
      userAlias = `${ctx.from.id}`;
    }

    ctx.reply(`${userAlias}`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: `NodeRed_${responseNodered.data.tag_name}`, url: "https://github.com/node-red/node-red" }],
            [{ text: `HomeAssistant Core_${responseHomeassistant.data.tag_name}`, url: "https://github.com/home-assistant/core" }],
            [{ text: `HomeAssistant OS_${responseHomeassistantSupervisor.data.tag_name}`, url: "https://github.com/home-assistant/operating-system" }],
            [{ text: `OpenHab core_${responseOpenhab.data[0].name}`, url: "https://github.com/openhab/openhab-core" }],
            [{ text: `DockerCompose_${responseDocker_compose.data.tag_name}`, url: "https://github.com/docker/compose" }],
            [{ text: `Zigbee2mqtt_${responseZigbee2mqtt.data.tag_name}`, url: "https://github.com/Koenkk/zigbee2mqtt" }],
            [{ text: `Mosquitto_${responseMosquitto.data[0].name}`, url: "https://github.com/eclipse/mosquitto" }],
            [{ text: `Portainer_${responsePortainer.data.tag_name}`, url: "https://github.com/portainer/portainer" }],
            [{ text: `Nginx_${responseNginx.data[0].name}`, url: "https://github.com/nginx/nginx" }],
          ]
        },
      }
    );
  })).catch(errors => {

  })
});