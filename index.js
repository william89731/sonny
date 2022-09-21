//require('dotenv').config({ path: '/bot/.env' });
const express = require("express");
//import express from './index.js';
//const mysql = require("mysql2");
const app = express();
const CalendarHelper = require('./calendar');
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

class Calendar {
  /**
   * Construct the calendar
   * @param {Telegraf} bot Telegraf bot instance
   * @param {*} options Options to configure the calendar
   */
  constructor(bot, options) {
    this.bot = bot;

    this.helper = new CalendarHelper(options);
  }

  /**
   * Return Calendar Markup
   * @param {Date} date Starting date for the calendar. When null, 'today' is used
   */
  getCalendar(date) {
    if (!date) date = new Date();

    return this.helper.getCalendarMarkup(date);
  }

  /**
   * Set the callback that will be called when a date is selected
   * @param {(context: Context, date: Date) => void} onDateSelected The callback to be used
   */
  setDateListener(onDateSelected) {
    this.bot.action(/calendar-telegram-date-[\d-]+/g, (context) => {
      if (onDateSelected) {
        let date = context.match[0].replace('calendar-telegram-date-', '');
        return context
          .answerCbQuery()
          .then(() => onDateSelected(context, date));
      }
    });

    this.bot.action(/calendar-telegram-prev-[\d-]+/g, (context) => {
      let dateString = context.match[0].replace('calendar-telegram-prev-', '');
      let date = new Date(dateString);
      date.setMonth(date.getMonth() - 1);

      let prevText = context.callbackQuery.message.text;

      let prevEntities = context.callbackQuery.message.entities;
      let extras = {
        ...this.helper.getCalendarMarkup(date),
        entities: prevEntities,
      };

      return context
        .answerCbQuery()
        .then(() => context.editMessageText(prevText, extras));
    });

    this.bot.action(/calendar-telegram-next-[\d-]+/g, (context) => {
      let dateString = context.match[0].replace('calendar-telegram-next-', '');
      let date = new Date(dateString);
      date.setMonth(date.getMonth() + 1);

      let prevText = context.callbackQuery.message.text;

      let prevEntities = context.callbackQuery.message.entities;
      let extras = {
        ...this.helper.getCalendarMarkup(date),
        entities: prevEntities,
      };

      return context
        .answerCbQuery()
        .then(() => context.editMessageText(prevText, extras));
    });

    this.bot.action(/calendar-telegram-ignore-[\d\w-]+/g, (context) =>
      context.answerCbQuery()
    );
  }

  /**
   * Minimum selectable date
   * @param {Date} date The date to be used
   */
  setMinDate(date) {
    this.helper.setMinDate(new Date(date));
    return this;
  }

  /**
   * Maximum selectable date
   * @param {Date} date The date to be used
   */
  setMaxDate(date) {
    this.helper.setMaxDate(new Date(date));
    return this;
  }

  /**
   * Set the week day names, where the first element is `startWeekDay` name
   * @param {String[]} names Names to be used
   */
  setWeekDayNames(names) {
    this.helper.setWeekDayNames(names);
    return this;
  }

  /**
   * Set the month names
   * @param {String[]} names Names to be used
   */
  setMonthNames(names) {
    this.helper.setMonthNames(names);
    return this;
  }

  /**
   * Set the first day of the week, where 0 is Sunday
   * @param {Number} startDay Day to be used
   */
  setStartWeekDay(startDay) {
    this.helper.setStartWeekDay(startDay);
    return this;
  }
} 
module.exports = Calendar;
//  console.log("leaving try-catch statement");
//app.use(express.json());
//app.use(express.static("express"));
//app.use('/', function(req,res){
  //  res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
 // });
//const server = http.createServer(app);
//app.listen(5002, () => console.log("listining on port 5002")); 

