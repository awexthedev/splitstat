const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');
module.exports = {
    name: 'cat',
    data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription(`See all the categories you can search!`),
    async execute(interaction) {
        const catEmbed = new discord.MessageEmbed()
        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
        .setColor(`#2c1178`)
        .setTitle(`Stats Categories`)
        .addFields(
            { name: 'Kills', value: 'Totals/Information of Kills' },
            { name: 'Accuracy', value: 'Total Accuracy with weapons' },
            { name: 'Special', value: 'Misc information; oddball pickups, flag pickups etc' },
            { name: 'Player', value: 'Player info, like KD' },
            { name: 'Streaks', value: 'Killstreak Information' },
            { name: 'Portal', value: 'Things with portals. Kills through them, destroyed etc.'}
        )
        .setFooter(`SplitStat`)
        .setTimestamp();

        return await interaction.reply({ embeds: [catEmbed] })
    }
}