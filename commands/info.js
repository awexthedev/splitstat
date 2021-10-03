const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');
// const github = require('../modules/github');
const axios = require('axios').default;

module.exports = {
    name: 'info',
    data: new SlashCommandBuilder()
    .setName(`info`)
    .setDescription(`Info about this bot!`),
    info: {
        "name": 'Info',
        "description": "A little notice & latest update regarding this bot!",
        "image": null,
        "usage": "/info",
            "deprecated": {
                "date": "10/02/21",
                "reason": "Not really needed anymore :("
            }
        },
    async execute(interaction) {
        const data = await axios.get(`https://api.github.com/repos/awexxx/splitstat/commits`)

        var date = data.data[0].commit.author.date
        var newdate = date.slice(0,10)

        const infoEmbed = new discord.MessageEmbed()
        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
        .setColor(`#2c1178`)
        .setTitle(`SplitStat Information`)
        .setDescription(`This bot was developed by **[Awex](https://github.com/awexxx)** and is not affiliated with 1047 Games and/or Tracker.gg (The Tracker Network).\nThe last push to this bot was on **${newdate}**`)
        .setFooter(`SplitStat`)
        .setTimestamp();

        return await interaction.reply({ embeds: [infoEmbed] });
    }
}