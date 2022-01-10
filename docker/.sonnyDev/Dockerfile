FROM node:16.4-alpine3.14 as builder
WORKDIR /bot
COPY package*.json  /bot/
RUN npm install
RUN npm run build && npm prune --production# 
FROM node:16.4-alpine3.14 as final
USER node:node
WORKDIR /bot
EXPOSE 5000
#CMD npm start
CMD ["node", "index.js"]