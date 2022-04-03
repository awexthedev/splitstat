const { SlashCommandBuilder } = require('@discordjs/builders');
const user = require('../modules/fetch_user');
const discord = require('discord.js');
module.exports = {
    name: 'search',
    data: new SlashCommandBuilder()
            .setName(`search`)
            .setDescription(`Search for a user!`)
    .addStringOption(option => 
        option.setName(`platform`)
            .setDescription(`Platform they're on.`)
            .setRequired(true)
            .addChoice('Xbox', 'xbl')
            .addChoice('PlayStation', 'psn')
            .addChoice('Steam', 'steam'))
    .addStringOption(option => (
        option.setName(`player`)
            .setDescription(`The profiles ID/Gamertag! For Steam, use their Steam Profile URL!.`)
            .setRequired(true))),
    info: {
        "name": 'Search',
        "description": "Search for a user! See if they've played Splitgate before!",
        "image": null,
        "usage": "/search [xbl, psn, steam] [user]",
        "requireArgs": true
    },
    async execute(interaction, args) {
        const platform = args[0];
        const player = args[1];
        const valid_platforms = new Set(['xbl', 'psn', 'steam' ]);

        if(!platform || !player) {
            const recentEmbed = new discord.MessageEmbed()
            .setAuthor({ name: `SplitStat Bot`, iconURL: `https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png` })
            .setColor(`#2c1178`)
            .setTitle(`Uh oh!`)
            .setDescription(`You didn't provide a platform or a player name.`)
            .setFooter({ text: `SplitStat | Need help? thatalex.dev/splitstat` })
            .setTimestamp();

            return interaction.reply({ embeds: [recentEmbed] });
        } else if (!valid_platforms.has(args[0].toLowerCase())) {
            const recentEmbed = new discord.MessageEmbed()
            .setAuthor({ name: `SplitStat Bot`, iconURL: `https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png` })
            .setColor(`#2c1178`)
            .setTitle(`Uh oh!`)
            .setDescription(`You didn't provide a valid platform to search on!\nExamples: **xbl**, **psn**, **steam**.`)
            .setFooter({ text: `SplitStat | Need help? thatalex.dev/splitstat` })
            .setTimestamp();

            return interaction.reply({ embeds: [recentEmbed] });
        }

        var data = await user(platform, player)

        const userEmbed = new discord.MessageEmbed()
        .setThumbnail(data.avatar)
        .setColor(`#2c1178`)
        .setTitle(`${data.username} was found!`)
        .setDescription(`**${data.username}** plays on ${data.trn[0].platformSlug}. Their user handle is **${data.trn[0].platformUserHandle}**!\nYou can find them [here](https://tracker.gg/splitgate/profile/${platform}/${data.id || data.username}/overview).`)
        .setFooter({ text: `SplitStat | Need help? thatalex.dev/splitstat` })
        .setTimestamp();

        return await interaction.reply({ embeds: [userEmbed] });
    }
}