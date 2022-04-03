const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');
const fetch = require('../modules/fetch_stats');
const catTypes = require('../modules/types');

module.exports = {
    name: 'lookup',
    data: new SlashCommandBuilder()
            .setName(`lookup`)
            .setDescription(`Lookup your user stats!`)
    .addStringOption(option => 
        option.setName(`platform`)
            .setDescription(`Platform you're on.`)
            .setRequired(true)
            .addChoice('Xbox', 'xbl')
            .addChoice('PlayStation', 'psn')
            .addChoice('Steam', 'steam'))
    .addStringOption(option => (
        option.setName(`player`)
            .setDescription(`Your ID/Gamertag! For Steam, use your Steam Profile URL!.`)
            .setRequired(true)))
    .addStringOption(option => (
        option.setName(`category`)
            .setDescription(`The category of your choice!`)
            .setRequired(true)
            .addChoice('Kills', 'Kills')
            .addChoice('Portals', 'Portals')
            .addChoice('Accuracy', 'Accuracy')
            .addChoice('Streaks', 'Streaks')
            .addChoice('Player', 'Player')
            .addChoice('Playlist', 'Playlist')
    )),
    info: {
        "name": 'Lookup',
        "description": "The main thing! Look up your username to get the latest, real-time stats!",
        "image": "https://scr.awexxx.xyz/upload?view=DiscordCanary_1dJ1mOhKrX.png",
        "usage": "/lookup [xbl, psn, steam] [user] [category]",
        "requireArgs": true
    },
    async execute(interaction, args) {
        const platform = args[0];
        const player = args[1];
        const category = args[2];
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

        // Stat Fetch
        var data = await fetch(platform.toLowerCase(), player, false)
        var name = data.id || data.username

        const statsEmbed = new discord.MessageEmbed()
        .setAuthor({ name: `${data.trn.platformInfo.platformUserHandle}'s Stats`, iconURL: data.avatar, url: "https://tracker.gg/splitgate/profile/" + platform + "/" + name }) 
        .setColor(`#2c1178`)
        .setTitle(`${category} Information`)
        .setFooter({ text: `SplitStat | Need help? thatalex.dev/splitstat` })
        .setTimestamp();

        var stat = catTypes[category.toLowerCase()];
        for(var i = 0; i < stat.length; i++) {
            statsEmbed.addField(data.trn.segments[0].stats[stat[i]].displayName, data.trn.segments[0].stats[stat[i]].displayValue);
        }

        return await interaction.reply({ embeds: [statsEmbed] });
    }
}