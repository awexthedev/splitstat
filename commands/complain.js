const fetch = require('node-fetch');
var config = require('../configd.json')

module.exports = {
    name: 'complain',
    async execute(message, args, MessageEmbed) {
        const complaint = args.slice(0).join(' ');

        try {
            config.complainembed.embeds[0].title = `Complaint from ${message.author.tag}`
            config.complainembed.embeds[0].description = `${complaint}`
            config.complainembed.embeds[0].author.icon_url = `${message.author.avatarURL()}`
            
            await fetch(`${config.botuser.error_url}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config.complainembed)
            })

            return message.reply('Got it! I sent that to the developer of this bot!\nYour complaint: `' + complaint + '`')
        }
        catch (error) {
            console.log(`Something went wrong with spl!complain!`, error)
            return message.reply(`Sorry, something went wrong! I've notified Awex of this issue and he's on it!`)
        }
    }
}