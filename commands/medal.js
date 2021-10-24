const discord =  require(`discord.js`);
const config = require('../configd.json');
const medal = require('medaltv-wrapper');
const { SlashCommandBuilder } = require('@discordjs/builders');

const axios = require('axios').default;

module.exports = {
    name: 'medal',
    data: new SlashCommandBuilder()
            .setName(`medal`)
            .setDescription(`Fetch a random Splitgate Medal Clip, powered by Medal.tv!`),
    info: {
        "name": "medal",
        "description": "Fetch a random Splitgate Medal Clip, powered by Medal.tv!",
        "image": null,
        "usage": "/medal"
    },
    async execute(interaction) {
        await medal.trendingClips({
            apikey: `${config.botuser.medal_api}`,
            categoryId: `494`,
            random: true,
            limit: 1
        })

        const clipEmbed = new discord.MessageEmbed()
        .setAuthor(`${medal.data.credits}`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`, `${medal.data.directClipUrl}`)
        .setColor(`#cc8b00`)
        .setTitle(`${medal.data.contentTitle}`)
        .setImage(`${medal.data.contentThumbnail}`)
        .setFooter(`Likes: ${medal.data.contentLikes} | Views: ${medal.data.contentViews}`)
        .setTimestamp(medal.data.createdTimestamp);

        return await interaction.reply({ embeds: [clipEmbed] })
    }
}