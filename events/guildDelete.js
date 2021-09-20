const discord = require('discord.js');
const config = require('../configd.json');
module.exports = {
    name: `guildDelete`,
    on: true,
    async execute(guild) {
        const webhookClient = new discord.WebhookClient({ id: config.botuser.webhookId, token: config.botuser.webhookToken })

        const leaveEmbed = new discord.MessageEmbed()
        .setTitle(`Left server!`)
        .setDescription(`SplitStat has left **${guild.name}**!`)

        webhookClient.send({
            username: `SplitStat - Left server!`,
            avatarURL: 'https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png',
            embeds: [leaveEmbed]
        })
    }
}