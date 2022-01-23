const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');
const link = require('../modules/linking/link_user');
module.exports = {
    name: 'link',
    data: new SlashCommandBuilder()
            .setName(`link`)
            .setDescription(`Link your Tracker account!`)
    .addStringOption(option => 
        option.setName(`platform`)
            .setDescription(`Platform you're on.`)
            .setRequired(true)
            .addChoice('Xbox', 'xbl')
            .addChoice('PlayStation', 'psn')
            .addChoice('Steam', 'steam'))
    .addStringOption(option => (
        option.setName(`player`)
            .setDescription(`Your profiles ID/Gamertag! For Steam, use your Steam Profile URL!.`)
            .setRequired(true))),
    info: {
        "name": 'Link',
        "description": "Link your Splitgate account in SplitStat ",
        "image": null,
        "usage": "link [xbl, psn, steam] [user]",
        "requireArgs": true
    },
    async execute(interaction, args, author) {
        const platform = args[0];
        const player = args[1];
        const valid_platforms = new Set(['xbl', 'psn', 'steam' ]);

        if(!platform || !player) {
            const recentEmbed = new discord.MessageEmbed()
            .setAuthor({ name: `SplitStat Bot`, iconURL: `https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png` })
            .setColor(`#2c1178`)
            .setTitle(`Uh oh!`)
            .setDescription(`You didn't provide a platform or a player name.`)
            .setFooter({ text: `SplitStat | Need help? awexxx.xyz/splitstat/discord` })
            .setTimestamp();

            return interaction.reply({ embeds: [recentEmbed] });
        } else if (!valid_platforms.has(args[0].toLowerCase())) {
            const recentEmbed = new discord.MessageEmbed()
            .setAuthor({ name: `SplitStat Bot`, iconURL: `https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png` })
            .setColor(`#2c1178`)
            .setTitle(`Uh oh!`)
            .setDescription(`You didn't provide a valid platform to search on!\nExamples: **xbl**, **psn**, **steam**.`)
            .setFooter({ text: `SplitStat | Need help? awexxx.xyz/splitstat/discord` })
            .setTimestamp();

            return interaction.reply({ embeds: [recentEmbed] });
        }

        var data = await link.link(platform, player, author.id);

        if(data === false) {
            return await interaction.reply(`Sorry, that player is already linked to another account!`)
        } else {
            return await interaction.reply(`**Whoohoo! You linked your account!** 🎉\nYou can now friend players using the **friend** command, see your stats on the fly and more!`)
        }

    }
}