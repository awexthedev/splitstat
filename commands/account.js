const { SlashCommandBuilder } = require('@discordjs/builders');

const fetchAcc = require('../modules/linking/fetchAccount');
const fetchStats = require('../modules/fetch_stats');
const fetchMatch = require('../modules/fetch_match');

const discord = require('discord.js');
const axios = require('axios');
const config = require('../config.json');
module.exports = {
    name: 'account',
    data: new SlashCommandBuilder()
        .setName('account')
        .setDescription('View your account information!')
        .addStringOption(option =>
            option.setName('action')
                .setDescription(`Action to perform.`)
                .setRequired(false)
                .addChoice('Stats', 'stats')
                .addChoice('Match', 'match'))
        .addStringOption(option =>
            option.setName(`category`)
                .setDescription(`Category to view for stats.`)
                .setRequired(false)
                .addChoice('Kills', 'Kills')
                .addChoice('Portals', 'Portals')
                .addChoice('Accuracy', 'Accuracy')
                .addChoice('Streaks', 'Streaks')
                .addChoice('Player', 'Player')
                .addChoice('Playlist', 'Playlist'))
        .addStringOption(option => 
            option.setName(`id`)
                .setDescription(`ID of the match to view.`)
                .setRequired(false)),
    info: {
        "name": 'Account',
        "description": "Access your currently linked account and its features!",
        "image": null,
        "usage": "account [optional stats, optional match] [optional stats category, optional match id]",
        "requireArgs": true
    },
    async execute(interaction, args, author) {
        var acc = await fetchAcc(author.id)
        if(acc === false) return await interaction.reply(`You have not linked your account yet!`);
        var allowed_args = new Set(['stats', 'match', 'friends']);

        if(!args[0]) {
            var data = await axios.get(`https://public-api.tracker.gg/v2/splitgate/standard/search?platform=${acc.gameid}&query=${acc.id}`, {
                headers: { 'TRN-Api-Key': `${config.apis.trn}` }
            })

            const userEmbed = new discord.MessageEmbed()
            .setAuthor({ name: `${data.data.data[0].platformUserHandle}'s Account`, iconURL: data.data.data[0].avatarUrl, url: `https://tracker.gg/splitgate/profile/${acc.gameid}/${acc.id}/overview` })
            .setColor(`#2c1178`)
            .setThumbnail(data.data.data[0].avatarUrl)
            .setTitle(`Your Account`)
            .setDescription(`You play on **${data.data.data[0].platformSlug}**.\nYour Tracker.gg overview is [here](https://tracker.gg/splitgate/profile/${acc.gameid}/${acc.id}/overview).`)
            .setFooter({ text: `SplitStat | Need help? awexxx.xyz/splitstat/discord` })
            .setTimestamp();
    
            return await interaction.reply({ embeds: [userEmbed] });
        } else if (allowed_args.has(args[0])) {
            if(args[0] === 'stats') {
                var data = await fetchStats(acc.gameid, acc.id, true)

                const statsEmbed = new discord.MessageEmbed()
                .setAuthor({ name: `${data.username}'s Stats`, iconURL: data.avatar })
                .setColor(`#2c1178`)
                .setTitle(`${args[1]} Information`)
                .setFooter({ text: `SplitStat | Need help? awexxx.xyz/splitstat/discord` })
                .setTimestamp();
        
                switch(args[1].toLowerCase()) {
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
            } else if (args[0] === 'match') {
                if(!args[1]) {
                    var data = await fetchMatch(null, acc.gameid, acc.id, true);
                    const recentEmbed = new discord.MessageEmbed()
                    .setAuthor({ name: `${data.username} -- ${acc.gameid}`, iconURL: data.avatar })
                    .setColor(`#2c1178`)
                    .setTitle(`Recent Matches`)
                    .addFields(
                        { name: `${data.trn.matches[0].attributes.id}`, value: `on ${data.trn.matches[0].metadata.mapName} | ${data.trn.matches[0].metadata.queue}`, inline: true },
                        { name: `${data.trn.matches[1].attributes.id}`, value: `on ${data.trn.matches[1].metadata.mapName} | ${data.trn.matches[1].metadata.queue}`, inline: true },
                        { name: `${data.trn.matches[2].attributes.id}`, value: `on ${data.trn.matches[2].metadata.mapName} | ${data.trn.matches[2].metadata.queue}`, inline: true },
                        { name: `${data.trn.matches[3].attributes.id}`, value: `on ${data.trn.matches[3].metadata.mapName} | ${data.trn.matches[3].metadata.queue}`, inline: true },
                        { name: `${data.trn.matches[4].attributes.id}`, value: `on ${data.trn.matches[4].metadata.mapName} | ${data.trn.matches[4].metadata.queue}`, inline: true }
                    )
                    .setFooter({ text: `SplitStat | Need help? awexxx.xyz/splitstat/discord` })
                    .setTimestamp();
        
                    await interaction.reply({ embeds: [recentEmbed] })
                } else {
                    var data = await fetchMatch(args[1], acc.gameid, acc.id, true);
                    const statEmbed = new discord.MessageEmbed()
                    .setAuthor({ name: `${data.username} -- ${acc.gameid}`, iconURL: data.avatar })
                    .setColor(`#2c1178`)
                    .setTitle(`Match Stats`)
                    .setImage(`${data.trn.metadata.map.imageUrl}`)
                    .setThumbnail(data.avatar)
                    .addFields(
                        { name: `Map Name`, value: `${data.trn.metadata.map.displayValue}`, inline: true },
                        { name: `Won?`, value: `${data.trn.children[0].metadata.isWinner}`, inline: true },
                        { name: `Points`, value: `${data.trn.children[0].metadata.points}`, inline: true },
                        { name: `Playlist`, value: `${data.trn.metadata.playlist.displayValue}`, inline: true },
                        { name: `Mode`, value: `${data.trn.metadata.mode.displayValue}`, inline: true } 
                    )
                    .setFooter({ text: `SplitStat | Need help? awexxx.xyz/splitstat/discord` })
                    .setTimestamp();
        
                    return await interaction.reply({ embeds: [statEmbed] })
                }
            } else if(args[0] === 'friends') {
                // Fetch a users friends from sql
                var friends = await fetchFriends(acc.id);
                // Create a new embed
                const friendsEmbed = new discord.MessageEmbed()
                .setAuthor({ name: `${acc.username} -- ${acc.gameid}`, iconURL: acc.avatar })
                .setColor(`#2c1178`)
                .setTitle(`Friends`)
                .setFooter({ text: `SplitStat | Need help? awexxx.xyz/splitstat/discord` })
                .setTimestamp();

                // Loop through the friends
                for(var i = 0; i < friends.length; i++) {
                    // Add a field for each friend
                    friendsEmbed.addFields(
                        { name: `${friends[i].username}`, value: `${friends[i].gameid}`, inline: true }
                    )
                }

                // Send the embed
                return await interaction.reply({ embeds: [friendsEmbed] });

            } else if(args[0] === 'addfriend') {
                console.log(`add friend`)
                if(args[1].startsWith('<@') && args[1].endsWith('>')) mention = args[1].slice(2, -1).replace('!', '')
                else mention = args[1]

                console.log(mention)
                var add = await friends.store(author.id, mention);
                // Check if the user exists
                if(add === false) {
                    // If the user does not exist, send an error message
                    return await interaction.reply(`User ${args[1]} does not exist.`);
                } else return await interaction.reply(`Added ${user.username} to your friends list.`);
            }
        }
    }
}