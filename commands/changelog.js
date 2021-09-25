const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');
module.exports = {
    name: 'changelog',
    info: {
    "name": 'changelog',
    "description": "See new features added to this bot!",
    "image": null,
      "deprecated": {
        'status': null,
        'date': null,
        'reason': null
      },
    },
    data: new SlashCommandBuilder()
    .setName(`changelog`)
    .setDescription(`See new features added to this bot!`),
    async execute(interaction) {
      const changelogEmbed = new discord.MessageEmbed()
      .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
      .setColor(`#2c1178`)
      .setTitle(`Latest Changelog - 09/25/2021`)
      .setDescription(`Dynamic help menu, fixed stuff, and more!\nThis update brings SplitStat to **Version 3.1!**`)
      .addFields(
        { name: 'Dynamic Help Menu', value: `Brand new help menu! Less code, more info!` },
        { name: 'Fixed capital URL issue', value: `Fixed a bug where if your Steam link started with "HTTPS" instead of "https", it would error out.` }
      )
      .setFooter(`SplitStat`)
      .setTimestamp();

    return await interaction.reply({ embeds: [changelogEmbed] });
    }
}