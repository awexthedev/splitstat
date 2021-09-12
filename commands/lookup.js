const api = require('../modules/api.js');

module.exports = {
    name: 'lookup',
    async execute(message, args, MessageEmbed) {
        if (!args.length) {
            const missingArgs = new MessageEmbed()
            .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
            .setTitle(`Not so fast!`)
            .setColor(`#2c1178`)
            .setDescription(`No arguments to correctly search for that user were provided. Please make sure your usage is correct!`)
            .setFooter(`SplitStat`)
            .setTimestamp();

            return message.reply({ embeds: [ missingArgs ] })
        } else {
            const platform = args[0]
            const player = args[1]
            const category = args[2]

            if (!platform || !player || !category) {
                const missingArgs = new MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setTitle(`Not so fast!`)
                .setColor(`#2c1178`)
                .setDescription(`Uh oh, something was undefined! Make sure you provided all 3 arguments before continuing.`)
                .setFooter(`SplitStat`)
                .setTimestamp();
    
                return message.reply({ embeds: [ missingArgs ] })
            }

            await api.fetchTrnApi(player, platform, args)

            if (api.errmsg === `User yes doesn't exist in Tracker Network's ${platform} API`) {
                const missingArgs = new MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setTitle(`Not so fast!`)
                .setColor(`#2c1178`)
                .setDescription(`Woah there! **${player}** wasn't found in Tracker Network's API! Are you sure it was the right name?`)
                .setFooter(`SplitStat`)
                .setTimestamp();
    
                return message.reply({ embeds: [ missingArgs ] })
            } else if(api.error === true || !api.trn) {
                const missingArgs = new MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setTitle(`Not so fast!`)
                .setColor(`#2c1178`)
                .setDescription('Uh oh! Something went wrong during the processing phase. This has been reported to Awex and will be fixed soon.\n**Error: `' + api.errmsg + '`**')
                .setFooter(`SplitStat`)
                .setTimestamp();
    
                return message.reply({ embeds: [ missingArgs ] })
            }


            // Beginning of data
            if (category.toLowerCase() === 'kills') {
                const killEmbed = new MessageEmbed()
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

                return message.reply({ embeds: [killEmbed] })
            } else if (category.toLowerCase() === 'accuracy') {
                const accuracyEmbed = new MessageEmbed()
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

                return message.reply({ embeds: [accuracyEmbed] })
            } else if (category.toLowerCase() === 'special') {
                const specialEmbed = new MessageEmbed()
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

                return message.reply({ embeds: [specialEmbed] })
            } else if (category.toLowerCase() === 'portal') {
                const portalEmbed = new MessageEmbed()
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

                return message.reply({ embeds: [portalEmbed] })
            } else if (category.toLowerCase() === 'streaks') {
                const streakEmbed = new MessageEmbed()
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

                return message.reply({ embeds: [streakEmbed] })
            } else if (category.toLowerCase() === `player`) {
                const playerEmbed = new MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setColor(`#2c1178`)
                .setTitle(`Player Information`)
                .addFields(
                    { name: 'KD', value: `${api.trn.data.segments[0].stats.kd.value}`, inline: true },
                    { name: 'KAD', value: `${api.trn.data.segments[0].stats.kad.value}`, inline: true },
                    { name: 'Points', value: `${api.trn.data.segments[0].stats.points.value}`, inline: true },
                    { name: 'Deaths', value: `${api.trn.data.segments[0].stats.deaths.value}`, inline: true },
                    { name: 'Suicides', value: `${api.trn.data.segments[0].stats.suicides.value}`, inline: true },
                    { name: 'Teabags', value: `${api.trn.data.segments[0].stats.teabags.value}`, inline: true },
                    { name: 'Damage Dealt', value: `${api.trn.data.segments[0].stats.damageDealt.value}`, inline: true },
                    { name: 'Matches Played', value: `${api.trn.data.segments[0].stats.matchesPlayed.value}`, inline: true },
                    { name: 'Wins', value: `${api.trn.data.segments[0].stats.wins.value}`, inline: true },
                    { name: 'Losses', value: `${api.trn.segments[0].stats.losses.value}`, inline: true },
                    { name: 'Time Played', value: `${api.trn.segments[0].stats.timePlayed.value}`, inline: true },
                    { name: 'Progression XP', value: `${api.trn.segments[0].stats.progressionXp.value}`, inline: true },
                    { name: 'Progression Level', value: `${api.trn.segments[0].stats.progressionLevel.value}`, inline: true },
                    { name: 'Rank XP', value: `${api.trn.data.segments[0].stats.rankXp.value}`, inline: true },
                    { name: 'Rank Level', value: `${api.trn.data.segments[0].stats.rankLevel.value}`, inline: true },
                    { name: 'Shots Fired', value: `${api.trn.data.segments[0].stats.shotsFired.value}`, inline: true },
                    { name: 'Shots Landed', value: `${api.trn.data.segments[0].stats.shotsLanded.value}`, inline: true }
                )
                .setFooter(`SplitStat`)
                .setTimestamp();

                return message.reply({ embeds: [ playerEmbed ] });
            } else {
                const missingArgs = new MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setTitle(`Not so fast!`)
                .setColor(`#2c1178`)
                .setDescription('Uh oh! You provided a category to check, but you provided an incorrect one!')
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
    
                return message.reply({ embeds: [ missingArgs ] })
            }
        }
    }
}