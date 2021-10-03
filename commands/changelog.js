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
      .setTitle(`Latest Changelog - 09/25/2021`)
      .setDescription(`Dynamic help menu, fixed stuff, and more!\nThis update brings SplitStat to **Version 3.2!**`)
      .addFields(
        { name: 'Added usage to help menu', value: `Not *really* important with slash commands but still pretty poggers!` },
        { name: 'Switched to axios', value: `Zoomy fetching for all!` },
        { name: 'Implemented some caching', value: `Started caching some results for up to 30 minutes` },
        { name: 'Rewrote some events', value: 'This helped improve some events.. like.. a *lot*' },
        { name: 'Completely removed the message event', value: `spl! will no longer return anything!` },
        { name: 'Added /discord', value: `Gives you the link to a support Discord!` }
      )
      .setFooter(`SplitStat | /discord`)
      .setTimestamp();

    return await interaction.reply({ embeds: [changelogEmbed] });
    }
}