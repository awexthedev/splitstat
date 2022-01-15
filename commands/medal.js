const discord =  require(`discord.js`);
const config = require('../config.json');
const m = require('medaltv-wrapper');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'medal',
    data: new SlashCommandBuilder()
            .setName(`medal`)
            .setDescription(`Fetch a random Splitgate Medal Clip, powered by Medal.tv!`),
    info: {
        "name": "medal",
        "description": "Fetch a random Splitgate Medal Clip, powered by Medal.tv!",
        "image": null,
        "usage": "/medal",
        "requireArgs": false
    },
    async execute(interaction) {
        var medal = await m.trendingClips({
            apikey: `${config.apis.medal}`,
            categoryId: `splitstat`,
            random: true,
            limit: 1
        })

        const clipEmbed = new discord.MessageEmbed()
        .setAuthor({ name: `${medal[0].credits}`, url: `${medal[0].directClipUrl}` })
        .setColor(`#cc8b00`)
        .setTitle(`${medal[0].contentTitle}`)
        .setImage(`${medal[0].contentThumbnail}`)
        .setFooter({ text: `Likes: ${medal[0].contentLikes} | Views: ${medal[0].contentViews}`, iconURL: `https://cdn.medal.tv/assets/img/avatars/default.png`})
        .setTimestamp(medal[0].createdTimestamp);

        return await interaction.reply({ embeds: [clipEmbed] })
    }
}