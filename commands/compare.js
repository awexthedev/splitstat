const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');

const fetchAcc = require('../modules/linking/fetchAccount');
const compare = require('../modules/compareStats');
module.exports = {
    name: 'compare',
    data: new SlashCommandBuilder()
            .setName(`compare`)
            .setDescription(`Compare your stats between a linked user!`)
            .addMentionableOption(option => 
                option.setName('mention')
                    .setDescription(`User Mention for link check`)
                    .setRequired(true))
            .addStringOption(option => 
                option.setName('category')
                    .setDescription(`Category to search`)
                    .setRequired(true)
                    .addChoice('Kills', 'Kills')
                    .addChoice('Portals', 'Portals')
                    .addChoice('Accuracy', 'Accuracy')
                    .addChoice('Streaks', 'Streaks')
                    .addChoice('Player', 'Player')
                    .addChoice('Playlist', 'Playlist')),
    info: {
        "name": 'Compare',
        "description": "Compare your stats with a user who linked with SplitStat!",
        "image": null,
        "usage": "account [discord-mention] [category]",
        "requireArgs": true
    },
    async execute(interaction, args, author) {
        var allowed_categories = new Set(['kills', 'portals', 'playlist', 'player', 'accuracy', 'streaks'])

        if(args[0].startsWith('<@') && args[0].endsWith('>')) mention = args[0].slice(2, -1).replace('!', '')
        else mention = args[0]

        if(args[0]) {
            if(!args[1]) return await interaction.reply(`Sorry, you need to provide a valid category to search.`)
            else if (!allowed_categories.has(args[1].toLowerCase())) return await interaction.reply(`Sorry, you provided a nonexistant category.`)
                var user = interaction.client.users.cache.get(mention);
                if(!user) return await interaction.reply(`Sorry, you provided an invalid user.`);

                var account1 = await fetchAcc(author.id)
                var account2 = await fetchAcc(user.id)

                if(account1 === false) return await interaction.reply(`Sorry, you need to link before using this command.`);
                else if(account2 === false) return await interaction.reply(`Sorry, <@${user.id}> isn't linked with SplitStat.`)
                var comp = await compare(account1, account2)

                const statsEmbed = new discord.MessageEmbed()
                .setColor(`#2c1178`)
                .setTitle(`${comp.user1.platformInfo.platformUserHandle} vs ${comp.user2.platformInfo.platformUserHandle} - ${args[1]} Information`)
                .setFooter({ text: `SplitStat | Need help? awexxx.xyz/splitstat/discord` })
                .setTimestamp();

                switch(args[1].toLowerCase()) {
                    case `kills`:
                        statsEmbed.addFields(
                            { name: 'First Bloods', value: `${comp.user1.segments[0].stats.firstBloods.displayValue} - ${comp.user2.segments[0].stats.firstBloods.displayValue}`, inline: true },
                            { name: 'Highest Consecutive Kills', value: `${comp.user1.segments[0].stats.highestConsecutiveKills.displayValue} - ${comp.user2.segments[0].stats.highestConsecutiveKills.displayValue}`, inline: true },
                            { name: 'Revenge Kills', value: `${comp.user1.segments[0].stats.revengeKills.displayValue} - ${comp.user2.segments[0].stats.revengeKills.displayValue}`, inline: true },
                            { name: 'Kills Per Match', value: `${comp.user1.segments[0].stats.killsPerMatch.displayValue} - ${comp.user2.segments[0].stats.killsPerMatch.displayValue}`, inline: true },
                            { name: 'Kills Per Minute', value: `${comp.user1.segments[0].stats.killsPerMinute.displayValue} - ${comp.user2.segments[0].stats.killsPerMinute.displayValue}`, inline: true },
                            { name: 'Headshot Kills', value: `${comp.user1.segments[0].stats.headshotKills.displayValue} - ${comp.user2.segments[0].stats.headshotKills.displayValue}`, inline: true },
                            { name: 'Collaterals', value: `${comp.user1.segments[0].stats.collaterals.displayValue} - ${comp.user2.segments[0].stats.collaterals.displayValue}`, inline: true },
                            { name: 'Melee Kills', value: `${comp.user1.segments[0].stats.meleeKills.displayValue} - ${comp.user2.segments[0].stats.meleeKills.displayValue}`, inline: true },
                            { name: 'Assists', value: `${comp.user1.segments[0].stats.assists.displayValue} - ${comp.user2.segments[0].stats.assists.displayValue}`, inline: true },
                            { name: 'Kills', value: `${comp.user1.segments[0].stats.kills.displayValue} - ${comp.user2.segments[0].stats.kills.displayValue}`, inline: true },
                        )
                        break;
                    case `player`:
                        statsEmbed.addFields(
                            { name: 'KD', value: `${comp.user1.segments[0].stats.kd.displayValue} - ${comp.user2.segments[0].stats.kd.displayValue}`, inline: true },
                            { name: 'KAD', value: `${comp.user1.segments[0].stats.kad.displayValue} - ${comp.user2.segments[0].stats.kad.displayValue}`, inline: true },
                            { name: 'Points', value: `${comp.user1.segments[0].stats.points.displayValue} - ${comp.user2.segments[0].stats.points.displayValue}`, inline: true },
                            { name: 'Deaths', value: `${comp.user1.segments[0].stats.deaths.displayValue} - ${comp.user2.segments[0].stats.deaths.displayValue}`, inline: true },
                            { name: 'Suicides', value: `${comp.user1.segments[0].stats.suicides.displayValue} - ${comp.user2.segments[0].stats.suicides.displayValue}`, inline: true },
                            { name: 'Matches Played', value: `${comp.user1.segments[0].stats.matchesPlayed.displayValue} - ${comp.user2.segments[0].stats.matchesPlayed.displayValue}`, inline: true },
                            { name: 'Wins', value: `${comp.user1.segments[0].stats.wins.displayValue} - ${comp.user2.segments[0].stats.wins.displayValue}`, inline: true },
                            { name: 'Losses', value: `${comp.user1.segments[0].stats.losses.displayValue} - ${comp.user2.segments[0].stats.losses.displayValue}`, inline: true },
                            { name: 'Time Played', value: `${comp.user1.segments[0].stats.timesPlayed.displayValue} - ${comp.user2.segments[0].stats.timePlayed.displayValue}`, inline: true },
                        )
                        break;
                    case `accuracy`:
                        statsEmbed.addFields(
                            { name: 'Headshots Landed', value: `${comp.user1.segments[0].stats.headshotsLanded.displayValue} - ${comp.user2.segments[0].stats.headshotsLanded.displayValue}`, inline: true },
                            { name: 'Headshots Accuracy', value: `${comp.user1.segments[0].stats.headshotAccuracy.displayValue} - ${comp.user2.segments[0].stats.headshotAccuracy.displayValue}`, inline: true },
                            { name: 'Shots Accuracy', value: `${comp.user1.segments[0].stats.shotsAccuracy.displayValue} - ${comp.user2.segments[0].stats.shotsAccuracy.displayValue}`, inline: true },
                            { name: 'Shots Landed', value: `${comp.user1.segments[0].stats.shotsLanded.displayValue} - ${comp.user2.segments[0].stats.shotsLanded.displayValue}`, inline: true },
                            { name: 'Shots Fired', value: `${comp.user1.segments[0].stats.shotsFired.displayValue} - ${comp.user2.segments[0].stats.shotsFired.displayValue}`, inline: true },
                        )
                        break;
                    case `portals`:
                        statsEmbed.addFields(
                            { name: 'Portal Kills', value: `${comp.user1.segments[0].stats.portalKills.displayValue} - ${comp.user2.segments[0].stats.portalKills.displayValue}`, inline: true },
                            { name: 'Kills Through Portal', value: `${comp.user1.segments[0].stats.killsThruPortal.displayValue} - ${comp.user2.segments[0].stats.killsThruPortal.displayValue}`, inline: true },
                            { name: 'Portals Spawned', value: `${comp.user1.segments[0].stats.portalsSpawned.displayValue} - ${comp.user2.segments[0].stats.portalsSpawned.displayValue}`, inline: true },
                            { name: 'Own Portals Entered', value: `${comp.user1.segments[0].stats.ownPortalsEntered.displayValue} - ${comp.user2.segments[0].stats.ownPortalsEntered.displayValue}`, inline: true },
                            { name: 'Ally Portals Entered', value: `${comp.user1.segments[0].stats.allyPortalsEntered.displayValue} - ${comp.user2.segments[0].stats.allyPortalsEntered.displayValue}`, inline: true },
                            { name: 'Enemy Portals Entered', value: `${comp.user1.segments[0].stats.enemyPortalsEntered.displayValue} - ${comp.user2.segments[0].stats.enemyPortalsEntered.displayValue}`, inline: true },
                            { name: 'Enemy Portals Destroyed', value: `${comp.user1.segments[0].stats.enemyPortalsDestroyed.displayValue} - ${comp.user2.segments[0].stats.enemyPortalsDestroyed.displayValue}`, inline: true },
                            { name: 'Total Distance Portaled', value: `${comp.user1.segments[0].stats.distancePortaled.displayValue} - ${comp.user2.segments[0].stats.distancePortaled.displayValue}`, inline: true },
                        )
                        break;
                    case `streaks`:
                        statsEmbed.addFields(
                            { name: 'King Slayers', value: `${comp.user1.segments[0].stats.kingSlayers.displayValue} - ${comp.user2.segments[0].stats.kingSlayers.displayValue}`, inline: true },
                            { name: '50 Kills', value: `${comp.user1.segments[0].stats.killstreak6.displayValue} - ${comp.user2.segments[0].stats.killstreak6.displayValue}`, inline: true },
                            { name: '25 Kills', value: `${comp.user1.segments[0].stats.killstreak5.displayValue} - ${comp.user2.segments[0].stats.killstreak5.displayValue}`, inline: true },
                            { name: '20 Kills', value: `${comp.user1.segments[0].stats.killstreak4.displayValue} - ${comp.user2.segments[0].stats.killstreak4.displayValue}`, inline: true },
                            { name: '15 Kills', value: `${comp.user1.segments[0].stats.killstreak3.displayValue} - ${comp.user2.segments[0].stats.killstreak3.displayValue}`, inline: true },
                            { name: '10 Kills', value: `${comp.user1.segments[0].stats.killstreak2.displayValue} - ${comp.user2.segments[0].stats.killstreak2.displayValue}`, inline: true },
                            { name: '5 Kills', value: `${comp.user1.segments[0].stats.killstreak1.displayValue} - ${comp.user2.segments[0].stats.killstreak1.displayValue}`, inline: true },
                        )
                        break;
                    case `playlist`:
                        statsEmbed.addFields(
                            { name: 'Oddball Kills', value: `${comp.user1.segments[0].stats.oddballKills.displayValue} - ${comp.user2.segments[0].stats.oddballKills.displayValue}`, inline: true },
                            { name: 'Oddballs Picked Up', value: `${comp.user1.segments[0].stats.oddballsPickedUp.displayValue} - ${comp.user2.segments[0].stats.oddballsPickedUp.displayValue}`, inline: true },
                            { name: 'Flag Carrier Kills', value: `${comp.user1.segments[0].stats.flagCarrierKills.displayValue} - ${comp.user2.segments[0].stats.flagCarrierKills.displayValue}`, inline: true },
                            { name: 'Flag Kills', value: `${comp.user1.segments[0].stats.flagKills.displayValue} - ${comp.user2.segments[0].stats.flagKills.displayValue}`, inline: true },
                            { name: 'Flags Picked Up', value: `${comp.user1.segments[0].stats.flagsPickedUp.displayValue} - ${comp.user2.segments[0].stats.flagsPickedUp.displayValue}`, inline: true },
                            { name: 'Flags Returned', value: `${comp.user1.segments[0].stats.flagsReturned.displayValue} - ${comp.user2.segments[0].stats.flagsReturned.displayValue}`, inline: true },
                            { name: 'Hills Captured', value: `${comp.user1.segments[0].stats.hillsCaptured.displayValue} - ${comp.user2.segments[0].stats.hillsCaptured.displayValue}`, inline: true },
                            { name: 'Hills Neutralized', value: `${comp.user1.segments[0].stats.hillsNeutralized.displayValue} - ${comp.user2.segments[0].stats.hillsNeutralized.displayValue}`, inline: true },
                            { name: 'Teabags', value: `${comp.user1.segments[0].stats.teabags.displayValue} - ${comp.user2.segments[0].stats.teabags.displayValue}`, inline: true },
                            // { name: `Oddball Kills`, value: `${data.trn.segments[0].stats.oddballKills.displayValue}`, inline: true },
                            // { name: `Oddball Picked Up`, value: `${data.trn.segments[0].stats.oddballsPickedUp.displayValue}`, inline: true },
                            // { name: `Flag Carrier Kills`, value: `${data.trn.segments[0].stats.flagCarrierKills.displayValue}`, inline: true },
                            // { name: `Flag Kills`, value: `${data.trn.segments[0].stats.flagKills.displayValue}`, inline: true },
                            // { name: `Flags Picked Up`, value: `${data.trn.segments[0].stats.flagsPickedUp.displayValue}`, inline: true },
                            // { name: `Flags Returned`, value: `${data.trn.segments[0].stats.flagsReturned.displayValue}`, inline: true },
                            // { name: `Hills Captured`, value: `${data.trn.segments[0].stats.hillsCaptured.displayValue}`, inline: true },
                            // { name: `Hills Neutralized`, value: `${data.trn.segments[0].stats.hillsNeutralized.displayValue}`, inline: true },
                            // { name: `Teabags/Total Teabags`, value: `${data.trn.segments[0].stats.teabags.displayValue}/${totalTeabags}`, inline: true },
                        )
                }

                return await interaction.reply({ embeds: [statsEmbed] });

            } else return await interaction.reply(`Sorry, you didn't provide a valid Discord mention.`)
    }
}