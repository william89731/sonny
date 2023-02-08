module.exports = {
  getUsernameOrId: function (msg_or_ctx) {
    if (msg_or_ctx.from.username !== undefined) {
      return `@${msg_or_ctx.from.username}`;
    } else {
      return `${msg_or_ctx.from.id}`;
    } 
  },
  getUsernameOrFirstName: function (msg_or_ctx) {
    if (msg_or_ctx.from.username !== undefined) {
      return `@${msg_or_ctx.from.username}`;
    } else {
      return `${msg_or_ctx.from.id}`;
    } 
  },
  isAdmin: function (chatMember) {
    if ((chatMember.status == 'creator') || (chatMember.status == 'administrator')){
      return true;
    }
    else{
      return false;
    }
  },
} 
