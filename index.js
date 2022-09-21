//require('dotenv').config({ path: '/bot/.env' });
const express = require("express");
//import express from './index.js';
//const mysql = require("mysql2");
const app = express();
//const  { Telegraf, Markup, keyboard, extra } = require('telegraf');
//const http = require('http');
//const path = require('path');


//ACTIONS 
require('/bot/src/actions/start');
require('/bot/src/actions/tastiera');
require('/bot/src/actions/sonny');
require('/bot/src/actions/admin');
require('/bot/src/actions/user');
require('/bot/src/actions/AI');




//COMANDS USERS
require('/bot/src/users/sicurezzaIot');
require('/bot/src/users/github');
require('/bot/src/users/nodered');
require('/bot/src/users/homeAssistant');
require('/bot/src/users/openhab');
require('/bot/src/users/search');
require('/bot/src/users/regolamento');
require('/bot/src/users/matrix');
require('/bot/src/users/meteo');
require('/bot/src/users/allerte.js');
require('/bot/src/users/arduino.js');
require('/bot/src/users/docker.js');
require('/bot/src/users/kubernetes.js');
require('/bot/src/users/release.js');
require('/bot/src/users/calendario.js');

//require('/bot/src/users/channels.js');
//require('/bot/src/users/fun.js');




//COMMANDS ADMIN
require('/bot/src/commands/admin/mute');
require('/bot/src/commands/admin/unmute');
require('/bot/src/commands/admin/ban');
require('/bot/src/commands/admin/unban');
require('/bot/src/commands/admin/strike');
require('/bot/src/commands/admin/unstrike');
require('/bot/src/commands/admin/info');


//RESTRICT
require('/bot/src/actions/newEntry');
//require('/bot/src/actions/newMember');
require('/bot/src/actions/badwords');
