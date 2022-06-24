class Message {

  constructor(msg){
    var replyId;
    var replyName;
    this.chatId = msg.chat.id;
    this.messageId = msg.message_id;
    this.fromId = msg.from.id;
    this.userId = msg.from.id;
    try{
      this.replyId = msg.message.reply_to_message.from.id;
      this.replyName = msg.message.reply_to_message.from.first_name;
    }catch(e){
      /// se replyId == false non è una reply
      this.replyId = false;
      //console.log("non è una risposta");
    }
    this.fromName = msg.from.first_name;
    this.testo = msg.update.message ;
    this.time = this.testo.text.split(' ')[1];  
//    console.log(this);
  }
}
module.exports = Message;

