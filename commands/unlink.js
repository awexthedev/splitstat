var fetch = require('node-fetch');
var delusr = require('../modules/info.js');

module.exports = {
    name: 'unlink',
    async execute(message, args, MessageEmbed) {
        await delusr.deleteInfo(message.author.id)

        if(delusr.msg === `User unlinked`) {
            return message.reply(`**Sorry to see you go :(**\nYour account has been successfully unlinked.`)
        } else if (delusr.msg === `User does not exist`) {
            return message.reply(`**You were never linked**! You LIAR!!!\nYour account is not connected to a Steam ID. If you believe this is an error, contact Awex.`);
        }
    }
}