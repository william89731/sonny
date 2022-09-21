![joinblink-blink](https://user-images.githubusercontent.com/68069659/191561607-47dea849-5b9e-40a1-ad61-5509ff372747.gif)


[![platform](https://img.shields.io/badge/platform-nodejs-blue)](https://nodejs.org/en/)
[![docker version](https://img.shields.io/badge/docker%20version-20.10-brightgreen)](https://www.docker.com/)
[![license](https://img.shields.io/badge/license-Apache--2.0-yellowgreen)](https://apache.org/licenses/LICENSE-2.0)


# sonny

Bot telegram for nodejs platform. Dockerized.

# Disclaimer

```this deployment is for ONLY dev istance. For prod,change dependency in package.json```

# Requirements

Os [linux]() installed in your system;


[docker](https://www.docker.com/) and [docker compose](https://docs.docker.com/compose/cli-command/). see my [script](https://github.com/william89731/easy-docker) for easy installation.

# Easy install

create dir and open terminal:

```bash
git clone https://github.com/william89731/sonny
```

create dir database/db:

```bash
mkdir database/db -p
```
create file .env and make. see [env-example](https://github.com/william89731/sonny/blob/main/env-example):

```bash
touch .env
```

install module npm:

```bash
npm i
```
run app:

```bash
docker compose --env-file .env up -d --remove-orphans
```
# Finally

![sonny3](https://user-images.githubusercontent.com/68069659/191560598-143802a6-f664-49d5-b3ef-2cb8ad073a91.gif)





