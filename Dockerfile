FROM node:18-alpine3.16 as build 
#RUN apk add --update nodejs npm 

WORKDIR /bot
COPY package*.json  /
RUN npm ci
#RUN npm prune --omit=dev

FROM alpine:latest
RUN apk add --update  npm --no-cache
COPY --from=build /bot /
WORKDIR /bot
EXPOSE 5002
CMD npm start



