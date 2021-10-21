const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');
module.exports = {
    name: 'changelog',
    info: {
    "name": 'changelog',
    "description": "See new features added to this bot!",
    "image": null,
    "usage": "/changelog"
    },
    data: new SlashCommandBuilder()
    .setName(`changelog`)
    .setDescription(`See new features added to this bot!`),
    async execute(interaction) {
      const changelogEmbed = new discord.MessageEmbed()
      .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
      .setColor(`#2c1178`)
      .setTitle(`Latest Changelog - 10/21/2021`)
      .setDescription(`Faster responses!\nThis update brings SplitStat to **Version 3.3!**`)
      .addFields(
        { name: 'Extra speedy responses!', value: `You should see data response times speeeeed up!` },
        { name: 'Improved voting system', value: `Only specific to the SplitStat Discord Server, but it should be fixed!`}
      )
      .setFooter(`SplitStat | /discord`)
      .setTimestamp();

    return await interaction.reply({ embeds: [changelogEmbed] });
    }
}