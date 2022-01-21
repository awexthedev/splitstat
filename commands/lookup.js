// const redis = require('../modules/redis-handler');
const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');
const fetch = require('../modules/fetch_stats');

// const redisPack = require('async-redis');
// const rc = redisPack.createClient();

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

        // Stat Fetch
        var data = await fetch(platform.toLowerCase(), player)

        const statsEmbed = new discord.MessageEmbed()
        .setAuthor({ name: `${data.username}'s Stats`, iconURL: data.avatar })
        .setColor(`#2c1178`)
        .setTitle(`${category} Information`)
        .setFooter({ text: `SplitStat | Need help? awexxx.xyz/splitstat/discord` })
        .setTimestamp();

        switch(category.toLowerCase()) {
            case `kills`:
                statsEmbed.addFields(
                    { name: 'First Bloods', value: `${data.trn.segments[0].stats.firstBloods.displayValue}`, inline: true },
                    { name: 'Highest Consecutive Kills', value: `${data.trn.segments[0].stats.highestConsecutiveKills.displayValue}`, inline: true },
                    { name: 'Revenge Kills', value: `${data.trn.segments[0].stats.revengeKills.displayValue}`, inline: true },
                    { name: 'Kills Per Match', value: `${data.trn.segments[0].stats.killsPerMatch.displayValue}`, inline: true },
                    { name: 'Kills Per Minute', value: `${data.trn.segments[0].stats.killsPerMinute.displayValue}`, inline: true },
                    { name: 'Headshot Kills', value: `${data.trn.segments[0].stats.headshotKills.displayValue}`, inline: true },
                    { name: 'Collaterals', value: `${data.trn.segments[0].stats.collaterals.displayValue}`, inline: true },
                    { name: 'Melee Kills', value: `${data.trn.segments[0].stats.meleeKills.displayValue}`, inline: true },
                    { name: 'Assists', value: `${data.trn.segments[0].stats.assists.displayValue}`, inline: true },
                    { name: 'Kills', value: `${data.trn.segments[0].stats.kills.displayValue}`, inline: true },
                )
                break;
            case `player`:
                statsEmbed.addFields(
                    { name: 'KD', value: `${data.trn.segments[0].stats.kd.displayValue}`, inline: true },
                    { name: 'KAD', value: `${data.trn.segments[0].stats.kad.displayValue}`, inline: true },
                    { name: 'Points', value: `${data.trn.segments[0].stats.points.displayValue}`, inline: true },
                    { name: 'Deaths', value: `${data.trn.segments[0].stats.deaths.displayValue}`, inline: true },
                    { name: 'Suicides', value: `${data.trn.segments[0].stats.suicides.displayValue}`, inline: true },
                    { name: 'Matches Played', value: `${data.trn.segments[0].stats.matchesPlayed.displayValue}`, inline: true },
                    { name: 'Wins', value: `${data.trn.segments[0].stats.wins.displayValue}`, inline: true },
                    { name: 'Losses', value: `${data.trn.segments[0].stats.losses.displayValue}`, inline: true },
                    { name: 'Time Played', value: `${data.trn.segments[0].stats.timePlayed.displayValue}`, inline: true },
                )
                break;
            case `accuracy`:
                statsEmbed.addFields(
                    { name: 'Headshots Landed', value: `${data.trn.segments[0].stats.headshotsLanded.displayValue}`, inline: true },
                    { name: 'Headshot Accuracy', value: `${data.trn.segments[0].stats.headshotAccuracy.displayValue}`, inline: true },
                    { name: 'Shots Accuracy', value: `${data.trn.segments[0].stats.shotsAccuracy.displayValue}`, inline: true },
                    { name: 'Shots Landed', value: `${data.trn.segments[0].stats.shotsLanded.displayValue}`, inline: true },
                    { name: 'Shots Fired', value: `${data.trn.segments[0].stats.shotsFired.displayValue}`, inline: true },
                )
                break;
            case `portals`:
                statsEmbed.addFields(
                    { name: 'Portal Kills', value: `${data.trn.segments[0].stats.portalKills.displayValue}`, inline: true },
                    { name: 'Kills Through Portal', value: `${data.trn.segments[0].stats.killsThruPortal.displayValue}`, inline: true },
                    { name: 'Portals Spawned', value: `${data.trn.segments[0].stats.portalsSpawned.displayValue}`, inline: true },
                    { name: 'Own Portals Entered', value: `${data.trn.segments[0].stats.ownPortalsEntered.displayValue}`, inline: true },
                    { name: 'Ally Portals Entered', value: `${data.trn.segments[0].stats.allyPortalsEntered.displayValue}`, inline: true },
                    { name: 'Enemy Portals Entered', value: `${data.trn.segments[0].stats.enemyPortalsEntered.displayValue}`, inline: true },
                    { name: 'Enemy Portals Destroyed', value: `${data.trn.segments[0].stats.enemyPortalsDestroyed.displayValue}`, inline: true },
                    { name: 'Total Distance Portaled', value: `${data.trn.segments[0].stats.distancePortaled.displayValue}`, inline: true },
                )
                break;
            case `streaks`:
                statsEmbed.addFields(
                    { name: 'King Slayers', value: `${data.trn.segments[0].stats.kingSlayers.displayValue}`, inline: true },
                    { name: '50 Kills', value: `${data.trn.segments[0].stats.killstreak6.displayValue}`, inline: true },
                    { name: '25 Kills', value: `${data.trn.segments[0].stats.killstreak5.displayValue}`, inline: true },
                    { name: '20 Kills', value: `${data.trn.segments[0].stats.killstreak4.displayValue}`, inline: true },
                    { name: '15 Kills', value: `${data.trn.segments[0].stats.killstreak3.displayValue}`, inline: true },
                    { name: '10 Kills', value: `${data.trn.segments[0].stats.killstreak2.displayValue}`, inline: true },
                    { name: '5 Kills', value: `${data.trn.segments[0].stats.killstreak1.displayValue}`, inline: true },
                )
                break;
            case `playlist`:
                var totalTeabags = Math.round(data.trn.segments[0].stats.teabags.value + data.trn.segments[0].stats.teabagsDenied.value);
                statsEmbed.addFields(
                    { name: `Oddball Kills`, value: `${data.trn.segments[0].stats.oddballKills.displayValue}`, inline: true },
                    { name: `Oddball Picked Up`, value: `${data.trn.segments[0].stats.oddballsPickedUp.displayValue}`, inline: true },
                    { name: `Flag Carrier Kills`, value: `${data.trn.segments[0].stats.flagCarrierKills.displayValue}`, inline: true },
                    { name: `Flag Kills`, value: `${data.trn.segments[0].stats.flagKills.displayValue}`, inline: true },
                    { name: `Flags Picked Up`, value: `${data.trn.segments[0].stats.flagsPickedUp.displayValue}`, inline: true },
                    { name: `Flags Returned`, value: `${data.trn.segments[0].stats.flagsReturned.displayValue}`, inline: true },
                    { name: `Hills Captured`, value: `${data.trn.segments[0].stats.hillsCaptured.displayValue}`, inline: true },
                    { name: `Hills Neutralized`, value: `${data.trn.segments[0].stats.hillsNeutralized.displayValue}`, inline: true },
                    { name: `Teabags/Total Teabags`, value: `${data.trn.segments[0].stats.teabags.displayValue}/${totalTeabags}`, inline: true },
                )
        }

        return await interaction.reply({ embeds: [statsEmbed] });
    }
}