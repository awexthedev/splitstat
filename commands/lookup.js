const redis = require('../modules/redis-handler');
const api = require('../modules/fetchit');
const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');

const redisPack = require('redis');
const rc = redisPack.createClient();

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
            .setDescription(`Your ID/Gamertag! For Steam, your Steam Profile URL!.`)
            .setRequired(true)))
    .addStringOption(option => (
        option.setName(`category`)
            .setDescription(`The category of your choice!`)
            .setRequired(true)
            .addChoice('Kills', 'kills')
            .addChoice('Portals', 'portals')
            .addChoice('Special', 'special')
            .addChoice('Accuracy', 'accuracy')
            .addChoice('Streaks', 'streaks')
            .addChoice('Player', 'player')
    )),
    info: {
        "name": 'Lookup',
        "description": "The main thing! Look up your username to get the latest, real-time stats!",
        "image": "https://scr.awexxx.xyz/upload?view=DiscordCanary_1dJ1mOhKrX.png",
        "usage": "/lookup [platform] [user] [category]"
    },
    async execute(interaction) {
            const platform = interaction.options.getString('platform')
            const player = interaction.options.getString('player')
            const category = interaction.options.getString('category')

            await redis.cacheData(player, platform)

            rc.get(player, async function(error, resp) {
                if (resp === null) {

                    await api.fetchTrnApi(player.toLowerCase(), platform)

                    if (api.errmsg === `User ${player} doesn't exist in Tracker Network's ${platform} API`) {
                        const fourohfour = new discord.MessageEmbed()
                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                        .setTitle(`Not so fast!`)
                        .setColor(`#2c1178`)
                        .setDescription(`Woah there! **${player}** wasn't found in Tracker Network's ${platform} API! Are you sure it was the right name & platform?`)
                        .setFooter(`SplitStat | /discord`)
                        .setTimestamp();
            
                        return await interaction.reply({ embeds: [ fourohfour ] })
                    } else if (api.errmsg === `Need to provide a URL for Steam user!`) {
                        const noUrl = new discord.MessageEmbed()
                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                        .setTitle(`Not so fast!`)
                        .setColor(`#2c1178`)
                        .setDescription('Uh oh! You used **Steam** as a way to find your stats. I need a URL to your Steam profile, not your username!')
                        .setFooter(`SplitStat | /discord`)
                        .setTimestamp();
            
                        return await interaction.reply({ embeds: [ noUrl ] })
                    }
        
                    // Beginning of data
                    if (category === 'kills') {
                        const killEmbed = new discord.MessageEmbed()
                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                        .setColor(`#2c1178`)
                        .setTitle('Kills Information')
                        .addFields(
                            { name: `Kills on Hill`, value: `${api.trn.enemyKillsOnHill.value}`, inline: true},
                            { name: `First Bloods`, value: `${api.trn.firstBloods.value}`, inline: true },
                            { name: 'Flag Carrier Kills', value: `${api.trn.flagCarrierKills.value}`, inline: true },
                            { name: 'Flag Kills', value: `${api.trn.flagKills.value}`, inline: true },
                            { name: 'Highest Consecutive Kills', value: `${api.trn.highestConsecutiveKills.value}`, inline: true },
                            { name: 'Kills as VIP', value: `${api.trn.killsAsVIP.value}`, inline: true },
                            { name: 'Kills on Hill', value: `${api.trn.killsOnHill.value}`, inline: true },
                            { name: 'Oddball Kills', value: `${api.trn.oddballKills.value}`, inline: true },
                            { name: 'Revenge Kills', value: `${api.trn.revengeKills.value}`, inline: true },
                            { name: 'Kills Per Match', value: `${api.trn.killsPerMatch.value}`, inline: true }, 
                            { name: 'Kills Per Minute', value: `${api.trn.killsPerMinute.value}`, inline: true },
                            { name: 'Headshot Kills', value: `${api.trn.headshotKills.value}`, inline: true },
                            { name: 'Collaterals', value: `${api.trn.collaterals.value}`, inline: true },
                            { name: 'Melee Kills', value: `${api.trn.meleeKills.value}`, inline: true },
                            { name: 'Assists', value: `${api.trn.assists.value}`, inline: true },
                            { name: 'Total Kills', value: `${api.trn.kills.value}`, inline: true }
                        )
                        .setFooter(`SplitStat | /discord`)
                        .setTimestamp();
        
                        return await interaction.reply({ embeds: [killEmbed] })
                    } else if (category === 'accuracy') {
                        const accuracyEmbed = new discord.MessageEmbed()
                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                        .setColor(`#2c1178`)
                        .setTitle(`Accuracy Information`)
                        .addFields(
                            { name: 'Headshots Landed', value: `${api.trn.headshotsLanded.value}`, inline: true },
                            { name: 'Shots Accuracy', value: `${api.trn.shotsAccuracy.value}`, inline: true },
                            { name: 'Shots Landed', value: `${api.trn.shotsLanded.value}`, inline: true },
                            { name: 'Headshot Accuracy', value: `${api.trn.headshotAccuracy.value}`, inline: true }
                        )
                        .setFooter(`SplitStat | /discord`)
                        .setTimestamp();
        
                        return await interaction.reply({ embeds: [accuracyEmbed] })
                    } else if (category === 'special') {
                        const specialEmbed = new discord.MessageEmbed()
                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                        .setColor(`#2c1178`)
                        .setTitle(`Special Information`)
                        .addFields(
                            { name: 'Flags Picked Up', value: `${api.trn.flagsPickedUp.value}`, inline: true },
                            { name: 'Flags Returned', value: `${api.trn.flagsReturned.value}`, inline: true },
                            { name: 'Hills Captured', value: `${api.trn.hillsCaptured.value}`, inline: true },
                            { name: 'Hills Neutralized', value: `${api.trn.hillsNeutralized.value}`, inline: true },
                            { name: 'Oddballs Picked Up', value: `${api.trn.oddballsPickedUp.value}`, inline: true },
                            { name: 'Teabags Denied', value: `${api.trn.teabagsDenied.value}`, inline: true }
                        )
                        .setFooter(`SplitStat | /discord`)
                        .setTimestamp();
        
                        return await interaction.reply({ embeds: [specialEmbed] })
                    } else if (category === 'portals') {
                        const portalEmbed = new discord.MessageEmbed()
                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                        .setTitle(`Portal Information`)
                        .setColor(`#2c1178`)
                        .setDescription(`All about portals. Kills through them, how many you've spawned etc.`)
                        .addFields(
                            { name: 'Portal Kills', value: `${api.trn.portalKills.value}`},
                            { name: 'Kills Through Portal', value: `${api.trn.killsThruPortal.value}` },
                            { name: 'Portals Spawned', value: `${api.trn.portalsSpawned.value}` },
                            { name: 'Own Portals Entered', value: `${api.trn.ownPortalsEntered.value}` },
                            { name: 'Enemy Portals Entered', value: `${api.trn.enemyPortalsEntered.value}` },
                            { name: 'Enemy Portals Destroyed', value: `${api.trn.enemyPortalsDestroyed.value}` },
                            { name: 'Distance Portaled', value: `${api.trn.distancePortaled.value}` },
                            { name: 'Ally Portals Entered', value: `${api.trn.allyPortalsEntered.value}` }
                        )
                        .setFooter(`SplitStat | /discord`)
                        .setTimestamp();
        
                        return await interaction.reply({ embeds: [portalEmbed] })
                    } else if (category === 'streaks') {
                        const streakEmbed = new discord.MessageEmbed()
                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                        .setColor(`#2c1178`)
                        .setTitle(`Streak Information`)
                        .addFields(
                            { name: 'King Slayers', value: `${api.trn.kingSlayers.value}`, inline: true },
                            { name: '50 Kills', value: `${api.trn.medalKillstreak6.value}`, inline: true },
                            { name: '25 Kills', value: `${api.trn.medalKillstreak5.value}`, inline: true },
                            { name: '20 Kills', value: `${api.trn.medalKillstreak4.value}`, inline: true },
                            { name: '15 Kills', value: `${api.trn.medalKillstreak3.value}`, inline: true },
                            { name: '10 Kills', value: `${api.trn.medalKillstreak2.value}`, inline: true },
                            { name: '5 kills', value: `${api.trn.medalKillstreak1.value}`, inline: true }
                        )
                        .setFooter(`SplitStat | /discord`)
                        .setTimestamp();
        
                        return await interaction.reply({ embeds: [streakEmbed] })
                    } else if (category === `player`) {
                        const playerEmbed = new discord.MessageEmbed()
                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                        .setColor(`#2c1178`)
                        .setTitle(`Player Information`)
                        .addFields(
                            { name: 'KD', value: `${api.trn.kd.value}`, inline: true },
                            { name: 'KAD', value: `${api.trn.kad.value}`, inline: true },
                            { name: 'Points', value: `${api.trn.points.value}`, inline: true },
                            { name: 'Deaths', value: `${api.trn.deaths.value}`, inline: true },
                            { name: 'Suicides', value: `${api.trn.suicides.value}`, inline: true },
                            { name: 'Teabags', value: `${api.trn.teabags.value}`, inline: true },
                            { name: 'Damage Dealt', value: `${api.trn.damageDealt.value}`, inline: true },
                            { name: 'Matches Played', value: `${api.trn.matchesPlayed.value}`, inline: true },
                            { name: 'Wins', value: `${api.trn.wins.value}`, inline: true },
                            { name: 'Losses', value: `${api.trn.losses.value}`, inline: true },
                            { name: 'Time Played', value: `${api.trn.timePlayed.value}`, inline: true },
                            { name: 'Progression XP', value: `${api.trn.progressionXp.value}`, inline: true },
                            { name: 'Progression Level', value: `${api.trn.progressionLevel.value}`, inline: true },
                            { name: 'Rank XP', value: `${api.trn.rankXp.value}`, inline: true },
                            { name: 'Rank Level', value: `${api.trn.rankLevel.value}`, inline: true },
                            { name: 'Shots Fired', value: `${api.trn.shotsFired.value}`, inline: true },
                            { name: 'Shots Landed', value: `${api.trn.shotsLanded.value}`, inline: true }
                        )
                        .setFooter(`SplitStat | /discord`)
                        .setTimestamp();
        
                        return await interaction.reply({ embeds: [ playerEmbed ] });
                }
                } else {
            // Beginning of data
            var data = JSON.parse(resp)

            if (category === 'kills') {
                const killEmbed = new discord.MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setColor(`#2c1178`)
                .setTitle('Kills Information')
                .addFields(
                    { name: `Kills on Hill`, value: `${data.killData.killsOnHill}`, inline: true},
                    { name: `First Bloods`, value: `${data.killData.firstBloods}`, inline: true },
                    { name: 'Flag Carrier Kills', value: `${data.killData.flagCarrierKills}`, inline: true },
                    { name: 'Flag Kills', value: `${data.killData.flagKills}`, inline: true },
                    { name: 'Highest Consecutive Kills', value: `${data.killData.highestConsecutiveKills}`, inline: true },
                    { name: 'Kills as VIP', value: `${data.killData.killsAsVIP}`, inline: true },
                    { name: 'Kills on Hill', value: `${data.killData.killsOnHill}`, inline: true },
                    { name: 'Oddball Kills', value: `${data.killData.oddballKills}`, inline: true },
                    { name: 'Revenge Kills', value: `${data.killData.revengeKills}`, inline: true },
                    { name: 'Kills Per Match', value: `${data.killData.killsPerMatch}`, inline: true }, 
                    { name: 'Kills Per Minute', value: `${data.killData.killsPerMinute}`, inline: true },
                    { name: 'Headshot Kills', value: `${data.killData.headshotKills}`, inline: true },
                    { name: 'Collaterals', value: `${data.killData.collaterals}`, inline: true },
                    { name: 'Melee Kills', value: `${data.killData.meleeKills}`, inline: true },
                    { name: 'Assists', value: `${data.killData.assists}`, inline: true },
                    { name: 'Total Kills', value: `${data.killData.kills}`, inline: true }
                )
                .setFooter(`SplitStat | /discord`)
                .setTimestamp();

                return await interaction.reply({ embeds: [killEmbed] })
            } else if (category === 'accuracy') {
                const accuracyEmbed = new discord.MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setColor(`#2c1178`)
                .setTitle(`Accuracy Information`)
                .addFields(
                    { name: 'Headshots Landed', value: `${data.accuracyData.headshotsLanded}`, inline: true },
                    { name: 'Shots Accuracy', value: `${data.accuracyData.shotsAccuracy}`, inline: true },
                    { name: 'Shots Landed', value: `${data.accuracyData.shotsLanded}`, inline: true },
                    { name: 'Headshot Accuracy', value: `${data.accuracyData.headshotAccuracy}`, inline: true }
                )
                .setFooter(`SplitStat | /discord`)
                .setTimestamp();

                return await interaction.reply({ embeds: [accuracyEmbed] })
            } else if (category === 'special') {
                const specialEmbed = new discord.MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setColor(`#2c1178`)
                .setTitle(`Special Information`)
                .addFields(
                    { name: 'Flags Picked Up', value: `${data.specialData.flagsPickedUp}`, inline: true },
                    { name: 'Flags Returned', value: `${data.specialData.flagsReturned}`, inline: true },
                    { name: 'Hills Captured', value: `${data.specialData.hillsCaptured}`, inline: true },
                    { name: 'Hills Neutralized', value: `${data.specialData.hillsNeutralized}`, inline: true },
                    { name: 'Oddballs Picked Up', value: `${data.specialData.oddballsPickedUp}`, inline: true },
                    { name: 'Teabags Denied', value: `${data.specialData.teabagsDenied}`, inline: true }
                )
                .setFooter(`SplitStat | /discord`)
                .setTimestamp();

                return await interaction.reply({ embeds: [specialEmbed] })
            } else if (category === 'portals') {
                const portalEmbed = new discord.MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setTitle(`Portal Information`)
                .setColor(`#2c1178`)
                .setDescription(`All about portals. Kills through them, how many you've spawned etc.`)
                .addFields(
                    { name: 'Portal Kills', value: `${data.portalData.portalKills}`},
                    { name: 'Kills Through Portal', value: `${data.portalData.killsThruPortal}` },
                    { name: 'Portals Spawned', value: `${data.portalData.portalsSpawned}` },
                    { name: 'Own Portals Entered', value: `${data.portalData.ownPortalsEntered}` },
                    { name: 'Enemy Portals Entered', value: `${data.portalData.enemyPortalsEntered}` },
                    { name: 'Enemy Portals Destroyed', value: `${data.portalData.enemyPortalsDestroyed}` },
                    { name: 'Distance Portaled', value: `${data.portalData.distancePortaled}` },
                    { name: 'Ally Portals Entered', value: `${data.portalData.allyPortalsEntered}` }
                )
                .setFooter(`SplitStat | /discord`)
                .setTimestamp();

                return await interaction.reply({ embeds: [portalEmbed] })
            } else if (category === 'streaks') {
                const streakEmbed = new discord.MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setColor(`#2c1178`)
                .setTitle(`Streak Information`)
                .addFields(
                    { name: 'King Slayers', value: `${data.streakData.kingSlayers}`, inline: true },
                    { name: '50 Kills', value: `${data.streakData.killstreak6}`, inline: true },
                    { name: '25 Kills', value: `${data.streakData.killstreak5}`, inline: true },
                    { name: '20 Kills', value: `${data.streakData.killstreak4}`, inline: true },
                    { name: '15 Kills', value: `${data.streakData.killstreak3}`, inline: true },
                    { name: '10 Kills', value: `${data.streakData.killstreak2}`, inline: true },
                    { name: '5 kills', value: `${data.streakData.killstreak1}`, inline: true }
                )
                .setFooter(`SplitStat | /discord`)
                .setTimestamp();

                return await interaction.reply({ embeds: [streakEmbed] })
            } else if (category === `player`) {
                const playerEmbed = new discord.MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setColor(`#2c1178`)
                .setTitle(`Player Information`)
                .addFields(
                    { name: 'KD', value: `${data.playerData.kd}`, inline: true },
                    { name: 'KAD', value: `${data.playerData.kad}`, inline: true },
                    { name: 'Points', value: `${data.playerData.points}`, inline: true },
                    { name: 'Deaths', value: `${data.playerData.deaths}`, inline: true },
                    { name: 'Suicides', value: `${data.playerData.suicides}`, inline: true },
                    { name: 'Teabags', value: `${data.playerData.teabags}`, inline: true },
                    { name: 'Damage Dealt', value: `${data.playerData.damageDealt}`, inline: true },
                    { name: 'Matches Played', value: `${data.playerData.matchesPlayed}`, inline: true },
                    { name: 'Wins', value: `${data.playerData.wins}`, inline: true },
                    { name: 'Losses', value: `${data.playerData.losses}`, inline: true },
                    { name: 'Time Played', value: `${data.playerData.timePlayed}`, inline: true },
                    { name: 'Progression XP', value: `${data.playerData.progressionXp}`, inline: true },
                    { name: 'Progression Level', value: `${data.playerData.progressionLevel}`, inline: true },
                    { name: 'Rank XP', value: `${data.playerData.rankXp}`, inline: true },
                    { name: 'Rank Level', value: `${data.playerData.rankLevel}`, inline: true },
                    { name: 'Shots Fired', value: `${data.playerData.shotsFired}`, inline: true },
                    { name: 'Shots Landed', value: `${data.playerData.shotsLanded}`, inline: true }
                )
                .setFooter(`SplitStat | /discord`)
                .setTimestamp();

                return await interaction.reply({ embeds: [ playerEmbed ] });
                    }
                }
            })
        }
    }