var fetch = require('node-fetch');
module.exports = {
    name: 'unlink',
    async execute(message, args, MessageEmbed) {

        deleteInfo();

        async function deleteInfo() {
            var ulink = await fetch(`http://localhost:3000/unlink?id=${message.author.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            }).then(response => response.json());

            if(ulink.message === 'User does not exist') {
                return message.reply(`**You're not linked!** Can't unlink an account if you're not linked to it.`)
            }

            return message.reply(`**Successfully unlinked!** Sorry to see you go :(\nIf you have anything you'd like to ask Awex, feel free to use **spl!complain**!`);
        }
    }
}