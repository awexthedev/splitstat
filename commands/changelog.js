const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');
module.exports = {
    name: 'changelog',
    data: new SlashCommandBuilder()
    .setName(`changelog`)
    .setDescription(`See new features added to this bot!`),
    async execute(interaction) {
      const changelogEmbed = new discord.MessageEmbed()
      .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
      .setColor(`#2c1178`)
      .setTitle(`Latest Changelog - 09/18/2021`)
      .setDescription(`Slash commands, sunsetting message commands and more!\nThis update brings SplitStat to **Version 3.0!**`)
      .addFields(
        { name: 'Implemented slash command system', value: "SplitStat now has slash command support!" },
        { name: 'Sunsetting of Message Commands', value: "All message commands have been depricated. They will no longer work." }
      )
      .setFooter(`SplitStat`)
      .setTimestamp();

    return await interaction.reply({ embeds: [changelogEmbed] });
    }
}