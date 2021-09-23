const api = require('../modules/api.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');

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
    deprecated: {
        'status': null,
        'date': null,
        'reason': null
    },
    async execute(interaction) {
            const platform = interaction.options.getString('platform')
            const player = interaction.options.getString('player')
            const category = interaction.options.getString('category')

            await api.fetchTrnApi(player, platform)

            if (api.errmsg === `User ${player} doesn't exist in Tracker Network's ${platform} API`) {
                const fourohfour = new discord.MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setTitle(`Not so fast!`)
                .setColor(`#2c1178`)
                .setDescription(`Woah there! **${player}** wasn't found in Tracker Network's ${platform} API! Are you sure it was the right name & platform?`)
                .setFooter(`SplitStat`)
                .setTimestamp();
    
                return await interaction.reply({ embeds: [ fourohfour ] })
            } else if (api.errmsg === `Need to provide a URL for Steam user!`) {
                const noUrl = new discord.MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setTitle(`Not so fast!`)
                .setColor(`#2c1178`)
                .setDescription('Uh oh! You used **Steam** as a way to find your stats. I need a URL to your Steam profile, not your username!')
                .setFooter(`SplitStat`)
                .setTimestamp();
    
                return await interaction.reply({ embeds: [ noUrl ] })
            } else if(api.error === true || !api.trn) {
                const unhandledError = new discord.MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setTitle(`Not so fast!`)
                .setColor(`#2c1178`)
                .setDescription('Uh oh! Something went wrong during the processing phase that was not handled. This has been reported to Awex and will be fixed soon.\n**Error: `' + api.errmsg + '`**')
                .setFooter(`SplitStat`)
                .setTimestamp();
    
                return await interaction.reply({ embeds: [ unhandledError ] })
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
                .setFooter(`SplitStat`)
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
                    { name: 'Headhot Accuracy', value: `${api.trn.headshotAccuracy.value}`, inline: true }
                )
                .setFooter(`SplitStat`)
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
                .setFooter(`SplitStat`)
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
                .setFooter(`SplitStat`)
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
                .setFooter(`SplitStat`)
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
                .setFooter(`SplitStat`)
                .setTimestamp();

                return await interaction.reply({ embeds: [ playerEmbed ] });
        }
    }
}