var fetch = require('node-fetch');

module.exports = {
    name: 'forceunlink',
    async execute(message, args) {

        if(!args.length) {
            return message.reply(`Usage: forceunlink [steamvanity]`);
        }

        var unlinkUser = await fetch(`http://localhost:3000/unlink?method=vanity&id=${args[0]}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json());

        if(unlinkUser.message === `User does not exist`) {
            return message.reply(`Uh oh! ${args[0]} doesn't exist in my database.`)
        }

        return message.reply(`**${args[0]}** unlinked.`);
    }
}