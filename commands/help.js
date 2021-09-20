const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');

module.exports = {
    name: 'help',
    data: new SlashCommandBuilder()
    .setName(`help`)
    .setDescription(`Help with the SplitStat bot!`),
    async execute(interaction) {
        const helpEmbed = new discord.MessageEmbed()
        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
        .setTitle(`SplitStat`)
        .setColor(`#2c1178`)
        .setDescription(`SplitStat is a Discord bot that fetches stats from the [Tracker Network](https://tracker.gg) and returns them to you!\n\nNote that this bot is **not** affiliated with [1047 Games](https://splitgate.com) or [The Tracker Network](https://tracker.gg).`)
        .addFields(
            { name: '/lookup', value: `The main thing! Look up your Splitgate stats using your Steam profile link.`, inline: true },
            { name: '/profile', value: `Returns some basic information TRN uses to format your profile..`, inline: false },
            { name: '/cat', value: `Gives all the categories you can use when spl!lookup prompts you for a category.`, inline: false, },
            { name: '/complain', value: `Allows you to send me a message! Feel free to use this as a suggestion tool or to vent about your frustration regarding this bot!`, inline: true },
            { name: '/changelog', value: 'Shows the latest updates to this bot.', inline: true  },
            { name: '/info', value: 'Gives info about the internals of me!', inline: true }
        )
        .setFooter(`SplitStat`)
        .setTimestamp();

        await interaction.reply({ embeds: [helpEmbed] })
    }
}