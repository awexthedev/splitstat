const discord = require('discord.js');
const config = require('../configd.json');
module.exports = {
    name: `guildDelete`,
    on: true,
    async execute(guild) {
        if(guild.name === undefined) return;

        const webhookClient = new discord.WebhookClient({ id: config.botuser.webhooks.guilds.webhookId, token: config.botuser.webhooks.guilds.webhookToken })

        const leaveEmbed = new discord.MessageEmbed()
        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
        .setColor(`#2c1178`)
        .setTitle(`Left server!`)
        .setDescription(`SplitStat has left **${guild.name}** at <t:${Math.round(guild.joinedTimestamp / 1000)}:f>!`)

        webhookClient.send({
            username: `SplitStat - Left server!`,
            avatarURL: 'https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png',
            embeds: [leaveEmbed]
        })
    }
}