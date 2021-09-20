const discord = require('discord.js');
const config = require('../configd.json');
module.exports = {
    name: `guildCreate`,
    on: true,
    async execute(guild) {
        const joinEmbed = new discord.MessageEmbed()
        .setTitle(`New server!`)
        .setDescription(`SplitStat has joined **${guild.name}**!`)

        const webhookClient = new discord.WebhookClient({ id: config.botuser.webhookId, token: config.botuser.webhookToken })

        webhookClient.send({
            username: `SplitStat - Joined Server!`,
            avatarURL: 'https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png',
            embeds: [joinEmbed]
        })
    }
}