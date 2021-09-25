const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');
const github = require('../modules/github');

module.exports = {
    name: 'info',
    data: new SlashCommandBuilder()
    .setName(`info`)
    .setDescription(`Info about this bot!`),
    info: {
        "name": 'Info',
        "description": "See all about the internals of this bot!",
        "image": null,
          "deprecated": {
            'status': null,
            'date': null,
            'reason': null
          },
        },
    async execute(interaction) {

        await github.fetchGit();

        const infoEmbed = new discord.MessageEmbed()
        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
        .setColor(`#2c1178`)
        .setTitle(`SplitStat Information`)
        .setDescription(`This bot was developed by **[Awex](https://github.com/awexxx)** and is not affiliated with 1047 Games and/or Tracker.gg (The Tracker Network).\nThe last push to this bot was on **${github.date}**`)
        .setFooter(`SplitStat`)
        .setTimestamp();

        return await interaction.reply({ embeds: [infoEmbed] });
    }
}