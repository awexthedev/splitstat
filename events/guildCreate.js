const discord = require('discord.js');
const config = require('../configd.json');
module.exports = {
    name: `guildCreate`,
    on: true,
    async execute(guild) {
        const joinEmbed = new discord.MessageEmbed()
        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
        .setColor(`#2c1178`)
        .setTitle(`New server!`)
        .setDescription(`SplitStat has joined **${guild.name}** at <t:${Math.round(guild.joinedTimestamp / 1000)}:f>!`)

        const webhookClient = new discord.WebhookClient({ id: config.botuser.webhooks.classic.webhookId, token: config.botuser.webhooks.classic.webhookToken })

        webhookClient.send({
            username: `SplitStat - Joined Server!`,
            avatarURL: 'https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png',
            embeds: [joinEmbed]
        })
    }
}