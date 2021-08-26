var fetch = require('node-fetch');
var config = require('../configd.json');
module.exports = {
    name: 'lookup',
    async execute(message, args, MessageEmbed) {
        const member = message.mentions.users.first();

        if(member) {
            var splitstatApi = await fetch(`http://localhost:3000/search?user=${member.id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).then(response => response.json());

            if(splitstatApi.status === 200) {
                try {
                    const confirm = await message.reply(`Got it! Now ${message.author}, what would you like to see? You can say **CANCEL** if you need to find the categories in **spl!cat**.`)
            const filter = (m) => m.author.id === message.author.id;
            const collector = confirm.channel.createMessageCollector(filter, {
                time: 60000
            });

            collector.on('collect', async (msg) => {
                if(msg.content.toLowerCase().startsWith(`portal`)) {
                    const portalEmbed = new MessageEmbed()
                    .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                    .setTitle(`Portal Information`)
                    .setColor(`#2c1178`)
                    .setDescription(`All about portals. Kills through them, how many you've spawned etc.`)
                    .addFields(
                        { name: 'Portal Kills', value: `${splitstatApi.trn.data.segments[0].stats.portalKills.value}`},
                        { name: 'Kills Through Portal', value: `${splitstatApi.trn.data.segments[0].stats.killsThruPortal.value}` },
                        { name: 'Portals Spawned', value: `${splitstatApi.trn.data.segments[0].stats.portalsSpawned.value}` },
                        { name: 'Own Portals Entered', value: `${splitstatApi.trn.data.segments[0].stats.ownPortalsEntered.value}` },
                        { name: 'Enemy Portals Entered', value: `${splitstatApi.trn.data.segments[0].stats.enemyPortalsEntered.value}` },
                        { name: 'Enemy Portals Destroyed', value: `${splitstatApi.trn.data.segments[0].stats.enemyPortalsDestroyed.value}` },
                        { name: 'Distance Portaled', value: `${splitstatApi.trn.data.segments[0].stats.distancePortaled.value}` },
                        { name: 'Ally Portals Entered', value: `${splitstatApi.trn.data.segments[0].stats.allyPortalsEntered.value}` }
                    )
                    .setFooter(`SplitStat`)
                    .setTimestamp();

                    collector.stop();
                    return msg.reply({ embeds: [portalEmbed] })
                } else if (msg.content.toLowerCase().startsWith(`kills`)) {
                    const killEmbed = new MessageEmbed()
                    .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                    .setColor(`#2c1178`)
                    .setTitle('Kills Information')
                    .addFields(
                        { name: `Kills on Hill`, value: `${splitstatApi.trn.data.segments[0].stats.enemyKillsOnHill.value}`, inline: true},
                        { name: `First Bloods`, value: `${splitstatApi.trn.data.segments[0].stats.firstBloods.value}`, inline: true },
                        { name: 'Flag Carrier Kills', value: `${splitstatApi.trn.data.segments[0].stats.flagCarrierKills.value}`, inline: true },
                        { name: 'Flag Kills', value: `${splitstatApi.trn.data.segments[0].stats.flagKills.value}`, inline: true },
                        { name: 'Highest Consecutive Kills', value: `${splitstatApi.trn.data.segments[0].stats.highestConsecutiveKills.value}`, inline: true },
                        { name: 'Kills as VIP', value: `${splitstatApi.trn.data.segments[0].stats.killsAsVIP.value}`, inline: true },
                        { name: 'Kills on Hill', value: `${splitstatApi.trn.data.segments[0].stats.killsOnHill.value}`, inline: true },
                        { name: 'Oddball Kills', value: `${splitstatApi.trn.data.segments[0].stats.oddballKills.value}`, inline: true },
                        { name: 'Revenge Kills', value: `${splitstatApi.trn.data.segments[0].stats.revengeKills.value}`, inline: true },
                        { name: 'Kills Per Match', value: `${splitstatApi.trn.data.segments[0].stats.killsPerMatch.value}`, inline: true }, 
                        { name: 'Kills Per Minute', value: `${splitstatApi.trn.data.segments[0].stats.killsPerMinute.value}`, inline: true },
                        { name: 'Headshot Kills', value: `${splitstatApi.trn.data.segments[0].stats.headshotKills.value}`, inline: true },
                        { name: 'Collaterals', value: `${splitstatApi.trn.data.segments[0].stats.collaterals.value}`, inline: true },
                        { name: 'Melee Kills', value: `${splitstatApi.trn.data.segments[0].stats.meleeKills.value}`, inline: true },
                        { name: 'Assists', value: `${splitstatApi.trn.data.segments[0].stats.assists.value}`, inline: true },
                        { name: 'Total Kills', value: `${splitstatApi.trn.data.segments[0].stats.kills.value}`, inline: true }
                    )
                    .setFooter(`SplitStat`)
                    .setTimestamp();

                    collector.stop();
                    return msg.reply({ embeds: [killEmbed] })
                } else if (msg.content.toLowerCase().startsWith(`player`)) {
                    const playerEmbed = new MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setColor(`#2c1178`)
                .setTitle(`Player Information`)
                .addFields(
                    { name: 'KD', value: `${splitstatApi.trn.data.segments[0].stats.kd.value}`, inline: true },
                    { name: 'KAD', value: `${splitstatApi.trn.data.segments[0].stats.kad.value}`, inline: true },
                    { name: 'Points', value: `${splitstatApi.trn.data.segments[0].stats.points.value}`, inline: true },
                    { name: 'Deaths', value: `${splitstatApi.trn.data.segments[0].stats.deaths.value}`, inline: true },
                    { name: 'Suicides', value: `${splitstatApi.trn.data.segments[0].stats.suicides.value}`, inline: true },
                    { name: 'Teabags', value: `${splitstatApi.trn.data.segments[0].stats.teabags.value}`, inline: true },
                    { name: 'Damage Dealt', value: `${splitstatApi.trn.data.segments[0].stats.damageDealt.value}`, inline: true },
                    { name: 'Matches Played', value: `${splitstatApi.trn.data.segments[0].stats.matchesPlayed.value}`, inline: true },
                    { name: 'Wins', value: `${splitstatApi.trn.data.segments[0].stats.wins.value}`, inline: true },
                    { name: 'Losses', value: `${splitstatApi.trn.data.segments[0].stats.losses.value}`, inline: true },
                    { name: 'Time Played', value: `${splitstatApi.trn.data.segments[0].stats.timePlayed.value}`, inline: true },
                    { name: 'Progression XP', value: `${splitstatApi.trn.data.segments[0].stats.progressionXp.value}`, inline: true },
                    { name: 'Progression Level', value: `${splitstatApi.trn.data.segments[0].stats.progressionLevel.value}`, inline: true },
                    { name: 'Rank XP', value: `${splitstatApi.trn.data.segments[0].stats.rankXp.value}`, inline: true },
                    { name: 'Rank Level', value: `${splitstatApi.trn.data.segments[0].stats.rankLevel.value}`, inline: true },
                    { name: 'Shots Fired', value: `${splitstatApi.trn.data.segments[0].stats.shotsFired.value}`, inline: true },
                    { name: 'Shots Landed', value: `${splitstatApi.trn.data.segments[0].stats.shotsLanded.value}`, inline: true }
                )
                .setFooter(`SplitStat`)
                .setTimestamp();

                collector.stop();
                return msg.reply({ embeds: [playerEmbed] })
                } else if (msg.content.toLowerCase().startsWith(`streaks`)) {
                    const streakEmbed = new MessageEmbed()
                    .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                    .setColor(`#2c1178`)
                    .setTitle(`Streak Information`)
                    .addFields(
                        { name: 'King Slayers', value: `${splitstatApi.trn.data.segments[0].stats.kingSlayers.value}`, inline: true },
                        { name: '50 Kills', value: `${splitstatApi.trn.data.segments[0].stats.medalKillstreak6.value}`, inline: true },
                        { name: '25 Kills', value: `${splitstatApi.trn.data.segments[0].stats.medalKillstreak5.value}`, inline: true },
                        { name: '20 Kills', value: `${splitstatApi.trn.data.segments[0].stats.medalKillstreak4.value}`, inline: true },
                        { name: '15 Kills', value: `${splitstatApi.trn.data.segments[0].stats.medalKillstreak3.value}`, inline: true },
                        { name: '10 Kills', value: `${splitstatApi.trn.data.segments[0].stats.medalKillstreak2.value}`, inline: true },
                        { name: '5 kills', value: `${splitstatApi.trn.data.segments[0].stats.medalKillstreak1.value}`, inline: true }
                    )
                    .setFooter(`SplitStat`)
                    .setTimestamp();

                    collector.stop();
                    return msg.reply({ embeds: [streakEmbed] })
                } else if (msg.content.toLowerCase().startsWith(`special`)) {
                    const specialEmbed = new MessageEmbed()
                    .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                    .setColor(`#2c1178`)
                    .setTitle(`Special Information`)
                    .addFields(
                        { name: 'Flags Picked Up', value: `${splitstatApi.trn.data.segments[0].stats.flagsPickedUp.value}`, inline: true },
                        { name: 'Flags Returned', value: `${splitstatApi.trn.data.segments[0].stats.flagsReturned.value}`, inline: true },
                        { name: 'Hills Captured', value: `${splitstatApi.trn.data.segments[0].stats.hillsCaptured.value}`, inline: true },
                        { name: 'Hills Neutralized', value: `${splitstatApi.trn.data.segments[0].stats.hillsNeutralized.value}`, inline: true },
                        { name: 'Oddballs Picked Up', value: `${splitstatApi.trn.data.segments[0].stats.oddballsPickedUp.value}`, inline: true },
                        { name: 'Teabags Denied', value: `${splitstatApi.trn.data.segments[0].stats.teabagsDenied.value}`, inline: true }
                    )
                    .setFooter(`SplitStat`)
                    .setTimestamp();

                    collector.stop();
                    return msg.reply({ embeds: [specialEmbed] })
                } else if (msg.content.toLowerCase().startsWith(`accuracy`)) {
                    const accuracyEmbed = new MessageEmbed()
                    .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                    .setColor(`#2c1178`)
                    .setTitle(`Accuracy Information`)
                    .addFields(
                        { name: 'Headshots Landed', value: `${splitstatApi.trn.data.segments[0].stats.headshotsLanded.value}`, inline: true },
                        { name: 'Shots Accuracy', value: `${splitstatApi.trn.data.segments[0].stats.shotsAccuracy.value}`, inline: true },
                        { name: 'Shots Landed', value: `${splitstatApi.trn.data.segments[0].stats.shotsLanded.value}`, inline: true },
                        { name: 'Headhot Accuracy', value: `${splitstatApi.trn.data.segments[0].stats.headshotAccuracy.value}`, inline: true }
                    )
                    .setFooter(`SplitStat`)
                    .setTimestamp();

                    collector.stop();
                    return message.reply({ embeds: [accuracyEmbed] })
                } else if (msg.content.toLowerCase().startsWith(`cancel`)) {
                    collector.stop();
                    return msg.reply(`Okay! I'm not listening anymore.`);
                } else {
                    collector.stop();
                    msg.reply(`Sorry, but that isn't a category. Check **spl!cat** to see all categories and re-run this command when you've got one.`)
                }
            })
        }
            catch(err) {
                var cid = uuid.v4()
                return message.reply(`Sorry, something went wrong while trying to run spl!lookup.\nThis has been forwarded to the dev to look into with a timestamp and error.\nYour case ID for this issue is ${cid}.`)
                }
            }
        }  else if (!member) {
            var splitstatApi = await fetch(`http://localhost:3000/search?user=${message.author.id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).then(response => response.json());

            if(splitstatApi.status === 200) {
                try {
                    const confirm = await message.reply(`Got it! Now ${message.author}, what would you like to see? You can say **CANCEL** if you need to find the categories in **spl!cat**.`)
            const filter = (m) => m.author.id === message.author.id;
            const collector = confirm.channel.createMessageCollector(filter, {
                time: 60000
            });

            collector.on('collect', async (msg) => {
                if(msg.content.toLowerCase().startsWith(`portal`)) {
                    const portalEmbed = new MessageEmbed()
                    .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                    .setTitle(`Portal Information`)
                    .setColor(`#2c1178`)
                    .setDescription(`All about portals. Kills through them, how many you've spawned etc.`)
                    .addFields(
                        { name: 'Portal Kills', value: `${splitstatApi.trn.data.segments[0].stats.portalKills.value}`},
                        { name: 'Kills Through Portal', value: `${splitstatApi.trn.data.segments[0].stats.killsThruPortal.value}` },
                        { name: 'Portals Spawned', value: `${splitstatApi.trn.data.segments[0].stats.portalsSpawned.value}` },
                        { name: 'Own Portals Entered', value: `${splitstatApi.trn.data.segments[0].stats.ownPortalsEntered.value}` },
                        { name: 'Enemy Portals Entered', value: `${splitstatApi.trn.data.segments[0].stats.enemyPortalsEntered.value}` },
                        { name: 'Enemy Portals Destroyed', value: `${splitstatApi.trn.data.segments[0].stats.enemyPortalsDestroyed.value}` },
                        { name: 'Distance Portaled', value: `${splitstatApi.trn.data.segments[0].stats.distancePortaled.value}` },
                        { name: 'Ally Portals Entered', value: `${splitstatApi.trn.data.segments[0].stats.allyPortalsEntered.value}` }
                    )
                    .setFooter(`SplitStat`)
                    .setTimestamp();

                    collector.stop();
                    return msg.reply({ embeds: [portalEmbed] })
                } else if (msg.content.toLowerCase().startsWith(`kills`)) {
                    const killEmbed = new MessageEmbed()
                    .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                    .setColor(`#2c1178`)
                    .setTitle('Kills Information')
                    .addFields(
                        { name: `Kills on Hill`, value: `${splitstatApi.trn.data.segments[0].stats.enemyKillsOnHill.value}`, inline: true},
                        { name: `First Bloods`, value: `${splitstatApi.trn.data.segments[0].stats.firstBloods.value}`, inline: true },
                        { name: 'Flag Carrier Kills', value: `${splitstatApi.trn.data.segments[0].stats.flagCarrierKills.value}`, inline: true },
                        { name: 'Flag Kills', value: `${splitstatApi.trn.data.segments[0].stats.flagKills.value}`, inline: true },
                        { name: 'Highest Consecutive Kills', value: `${splitstatApi.trn.data.segments[0].stats.highestConsecutiveKills.value}`, inline: true },
                        { name: 'Kills as VIP', value: `${splitstatApi.trn.data.segments[0].stats.killsAsVIP.value}`, inline: true },
                        { name: 'Kills on Hill', value: `${splitstatApi.trn.data.segments[0].stats.killsOnHill.value}`, inline: true },
                        { name: 'Oddball Kills', value: `${splitstatApi.trn.data.segments[0].stats.oddballKills.value}`, inline: true },
                        { name: 'Revenge Kills', value: `${splitstatApi.trn.data.segments[0].stats.revengeKills.value}`, inline: true },
                        { name: 'Kills Per Match', value: `${splitstatApi.trn.data.segments[0].stats.killsPerMatch.value}`, inline: true }, 
                        { name: 'Kills Per Minute', value: `${splitstatApi.trn.data.segments[0].stats.killsPerMinute.value}`, inline: true },
                        { name: 'Headshot Kills', value: `${splitstatApi.trn.data.segments[0].stats.headshotKills.value}`, inline: true },
                        { name: 'Collaterals', value: `${splitstatApi.trn.data.segments[0].stats.collaterals.value}`, inline: true },
                        { name: 'Melee Kills', value: `${splitstatApi.trn.data.segments[0].stats.meleeKills.value}`, inline: true },
                        { name: 'Assists', value: `${splitstatApi.trn.data.segments[0].stats.assists.value}`, inline: true },
                        { name: 'Total Kills', value: `${splitstatApi.trn.data.segments[0].stats.kills.value}`, inline: true }
                    )
                    .setFooter(`SplitStat`)
                    .setTimestamp();

                    collector.stop();
                    return msg.reply({ embeds: [killEmbed] })
                } else if (msg.content.toLowerCase().startsWith(`player`)) {
                    const playerEmbed = new MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setColor(`#2c1178`)
                .setTitle(`Player Information`)
                .addFields(
                    { name: 'KD', value: `${splitstatApi.trn.data.segments[0].stats.kd.value}`, inline: true },
                    { name: 'KAD', value: `${splitstatApi.trn.data.segments[0].stats.kad.value}`, inline: true },
                    { name: 'Points', value: `${splitstatApi.trn.data.segments[0].stats.points.value}`, inline: true },
                    { name: 'Deaths', value: `${splitstatApi.trn.data.segments[0].stats.deaths.value}`, inline: true },
                    { name: 'Suicides', value: `${splitstatApi.trn.data.segments[0].stats.suicides.value}`, inline: true },
                    { name: 'Teabags', value: `${splitstatApi.trn.data.segments[0].stats.teabags.value}`, inline: true },
                    { name: 'Damage Dealt', value: `${splitstatApi.trn.data.segments[0].stats.damageDealt.value}`, inline: true },
                    { name: 'Matches Played', value: `${splitstatApi.trn.data.segments[0].stats.matchesPlayed.value}`, inline: true },
                    { name: 'Wins', value: `${splitstatApi.trn.data.segments[0].stats.wins.value}`, inline: true },
                    { name: 'Losses', value: `${splitstatApi.trn.data.segments[0].stats.losses.value}`, inline: true },
                    { name: 'Time Played', value: `${splitstatApi.trn.data.segments[0].stats.timePlayed.value}`, inline: true },
                    { name: 'Progression XP', value: `${splitstatApi.trn.data.segments[0].stats.progressionXp.value}`, inline: true },
                    { name: 'Progression Level', value: `${splitstatApi.trn.data.segments[0].stats.progressionLevel.value}`, inline: true },
                    { name: 'Rank XP', value: `${splitstatApi.trn.data.segments[0].stats.rankXp.value}`, inline: true },
                    { name: 'Rank Level', value: `${splitstatApi.trn.data.segments[0].stats.rankLevel.value}`, inline: true },
                    { name: 'Shots Fired', value: `${splitstatApi.trn.data.segments[0].stats.shotsFired.value}`, inline: true },
                    { name: 'Shots Landed', value: `${splitstatApi.trn.data.segments[0].stats.shotsLanded.value}`, inline: true }
                )
                .setFooter(`SplitStat`)
                .setTimestamp();

                collector.stop();
                return msg.reply({ embeds: [playerEmbed] })
                } else if (msg.content.toLowerCase().startsWith(`streaks`)) {
                    const streakEmbed = new MessageEmbed()
                    .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                    .setColor(`#2c1178`)
                    .setTitle(`Streak Information`)
                    .addFields(
                        { name: 'King Slayers', value: `${splitstatApi.trn.data.segments[0].stats.kingSlayers.value}`, inline: true },
                        { name: '50 Kills', value: `${splitstatApi.trn.data.segments[0].stats.medalKillstreak6.value}`, inline: true },
                        { name: '25 Kills', value: `${splitstatApi.trn.data.segments[0].stats.medalKillstreak5.value}`, inline: true },
                        { name: '20 Kills', value: `${splitstatApi.trn.data.segments[0].stats.medalKillstreak4.value}`, inline: true },
                        { name: '15 Kills', value: `${splitstatApi.trn.data.segments[0].stats.medalKillstreak3.value}`, inline: true },
                        { name: '10 Kills', value: `${splitstatApi.trn.data.segments[0].stats.medalKillstreak2.value}`, inline: true },
                        { name: '5 kills', value: `${splitstatApi.trn.data.segments[0].stats.medalKillstreak1.value}`, inline: true }
                    )
                    .setFooter(`SplitStat`)
                    .setTimestamp();

                    collector.stop();
                    return msg.reply({ embeds: [streakEmbed] })
                } else if (msg.content.toLowerCase().startsWith(`special`)) {
                    const specialEmbed = new MessageEmbed()
                    .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                    .setColor(`#2c1178`)
                    .setTitle(`Special Information`)
                    .addFields(
                        { name: 'Flags Picked Up', value: `${splitstatApi.trn.data.segments[0].stats.flagsPickedUp.value}`, inline: true },
                        { name: 'Flags Returned', value: `${splitstatApi.trn.data.segments[0].stats.flagsReturned.value}`, inline: true },
                        { name: 'Hills Captured', value: `${splitstatApi.trn.data.segments[0].stats.hillsCaptured.value}`, inline: true },
                        { name: 'Hills Neutralized', value: `${splitstatApi.trn.data.segments[0].stats.hillsNeutralized.value}`, inline: true },
                        { name: 'Oddballs Picked Up', value: `${splitstatApi.trn.data.segments[0].stats.oddballsPickedUp.value}`, inline: true },
                        { name: 'Teabags Denied', value: `${splitstatApi.trn.data.segments[0].stats.teabagsDenied.value}`, inline: true }
                    )
                    .setFooter(`SplitStat`)
                    .setTimestamp();

                    collector.stop();
                    return msg.reply({ embeds: [specialEmbed] })
                } else if (msg.content.toLowerCase().startsWith(`accuracy`)) {
                    const accuracyEmbed = new MessageEmbed()
                    .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                    .setColor(`#2c1178`)
                    .setTitle(`Accuracy Information`)
                    .addFields(
                        { name: 'Headshots Landed', value: `${splitstatApi.trn.data.segments[0].stats.headshotsLanded.value}`, inline: true },
                        { name: 'Shots Accuracy', value: `${splitstatApi.trn.data.segments[0].stats.shotsAccuracy.value}`, inline: true },
                        { name: 'Shots Landed', value: `${splitstatApi.trn.data.segments[0].stats.shotsLanded.value}`, inline: true },
                        { name: 'Headhot Accuracy', value: `${splitstatApi.trn.data.segments[0].stats.headshotAccuracy.value}`, inline: true }
                    )
                    .setFooter(`SplitStat`)
                    .setTimestamp();

                    collector.stop();
                    return message.reply({ embeds: [accuracyEmbed] })
                } else if (msg.content.toLowerCase().startsWith(`cancel`)) {
                    collector.stop();
                    return msg.reply(`Okay! I'm not listening anymore.`);
                } else {
                    collector.stop();
                    msg.reply(`Sorry, but that isn't a category. Check **spl!cat** to see all categories and re-run this command when you've got one.`)
                }
            })
        }
            catch(err) {
                var cid = uuid.v4()
                return message.reply(`Sorry, something went wrong while trying to run spl!lookup.\nThis has been forwarded to the dev to look into with a timestamp and error.\nYour case ID for this issue is ${cid}.`)
                }
            } else if (splitstatApi.status === 404) {
                const confirmation = await message.reply(`Hey there ${message.author}!\nWhat's the platform of the user you're trying to find the profile of? (Xbox, Steam, Playstation)\nIf you need to cancel at anytime, say **cancel**.`);
                const filter = (m) => m.author.id === message.author.id;
                const collector = confirmation.channel.createMessageCollector(filter, {
                    time: 60000,
                    });

                    collector.on('collect', async (msg) => {
                        if(msg.content.toLowerCase().startsWith(`xbox`)) {
                            collector.stop();
                            const confirmation = await msg.reply(`Great! What's their username?`);
                            const filter = (m) => m.author.id === message.author.id;
                            const collector1 = confirmation.channel.createMessageCollector(filter, {
                                time: 60000,
                                });

                                collector1.on(`collect`, async (msgid) => {
                                    var trnurl = `https://public-api.tracker.gg/v2/splitgate/standard/profile/xbl/${msgid.content}`
                                    const data = await fetch(`${trnurl}`, {
                                        method: 'GET',
                                        headers: { 'TRN-Api-Key': `${config.botuser.trn_api}` }
                                    }).then(response => response.json());

                                    collector1.stop();
                                    if(data.errors) {
                                        if(data.errors[0].code === "CollectorResultStatus::NotFound") {
                                            return msgid.reply(`Sorry, that user doesn't exist on Splitgate **Xbox**.`)
                                        }
                                    }

                                        const confirm = await message.reply(`Got it! Now ${message.author}, what would you like to see? You can say **CANCEL** if you need to find the categories in **spl!cat**.`)
                                const filter = (m) => m.author.id === message.author.id;
                                const collector = confirm.channel.createMessageCollector(filter, {
                                    time: 60000
                                });
                    
                                collector.on('collect', async (msg) => {
                                    if(msg.content.toLowerCase().startsWith(`portal`)) {
                                        const portalEmbed = new MessageEmbed()
                                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                                        .setTitle(`Portal Information`)
                                        .setColor(`#2c1178`)
                                        .setDescription(`All about portals. Kills through them, how many you've spawned etc.`)
                                        .addFields(
                                            { name: 'Portal Kills', value: `${data.data.segments[0].stats.portalKills.value}`},
                                            { name: 'Kills Through Portal', value: `${data.data.segments[0].stats.killsThruPortal.value}` },
                                            { name: 'Portals Spawned', value: `${data.data.segments[0].stats.portalsSpawned.value}` },
                                            { name: 'Own Portals Entered', value: `${data.data.segments[0].stats.ownPortalsEntered.value}` },
                                            { name: 'Enemy Portals Entered', value: `${data.data.segments[0].stats.enemyPortalsEntered.value}` },
                                            { name: 'Enemy Portals Destroyed', value: `${data.data.segments[0].stats.enemyPortalsDestroyed.value}` },
                                            { name: 'Distance Portaled', value: `${data.data.segments[0].stats.distancePortaled.value}` },
                                            { name: 'Ally Portals Entered', value: `${data.data.segments[0].stats.allyPortalsEntered.value}` }
                                        )
                                        .setFooter(`SplitStat`)
                                        .setTimestamp();
                    
                                        collector.stop();
                                        message.channel.send({ embeds: [portalEmbed] })
                                    } else if (msg.content.toLowerCase().startsWith(`kills`)) {
                                        const killEmbed = new MessageEmbed()
                                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                                        .setColor(`#2c1178`)
                                        .setTitle('Kills Information')
                                        .addFields(
                                            { name: `Kills on Hill`, value: `${data.data.segments[0].stats.enemyKillsOnHill.value}`, inline: true},
                                            { name: `First Bloods`, value: `${data.data.segments[0].stats.firstBloods.value}`, inline: true },
                                            { name: 'Flag Carrier Kills', value: `${data.data.segments[0].stats.flagCarrierKills.value}`, inline: true },
                                            { name: 'Flag Kills', value: `${data.data.segments[0].stats.flagKills.value}`, inline: true },
                                            { name: 'Highest Consecutive Kills', value: `${data.data.segments[0].stats.highestConsecutiveKills.value}`, inline: true },
                                            { name: 'Kills as VIP', value: `${data.data.segments[0].stats.killsAsVIP.value}`, inline: true },
                                            { name: 'Kills on Hill', value: `${data.data.segments[0].stats.killsOnHill.value}`, inline: true },
                                            { name: 'Oddball Kills', value: `${data.data.segments[0].stats.oddballKills.value}`, inline: true },
                                            { name: 'Revenge Kills', value: `${data.data.segments[0].stats.revengeKills.value}`, inline: true },
                                            { name: 'Kills Per Match', value: `${data.data.segments[0].stats.killsPerMatch.value}`, inline: true }, 
                                            { name: 'Kills Per Minute', value: `${data.data.segments[0].stats.killsPerMinute.value}`, inline: true },
                                            { name: 'Headshot Kills', value: `${data.data.segments[0].stats.headshotKills.value}`, inline: true },
                                            { name: 'Collaterals', value: `${data.data.segments[0].stats.collaterals.value}`, inline: true },
                                            { name: 'Melee Kills', value: `${data.data.segments[0].stats.meleeKills.value}`, inline: true },
                                            { name: 'Assists', value: `${data.data.segments[0].stats.assists.value}`, inline: true },
                                            { name: 'Total Kills', value: `${data.data.segments[0].stats.kills.value}`, inline: true }
                                        )
                                        .setFooter(`SplitStat`)
                                        .setTimestamp();
                    
                                        collector.stop();
                                        return message.channel.send({ embeds: [killEmbed] })
                                    } else if (msg.content.toLowerCase().startsWith(`player`)) {
                                        const playerEmbed = new MessageEmbed()
                                    .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                                    .setColor(`#2c1178`)
                                    .setTitle(`Player Information`)
                                    .addFields(
                                        { name: 'KD', value: `${data.data.segments[0].stats.kd.value}`, inline: true },
                                        { name: 'KAD', value: `${data.data.segments[0].stats.kad.value}`, inline: true },
                                        { name: 'Points', value: `${data.data.segments[0].stats.points.value}`, inline: true },
                                        { name: 'Deaths', value: `${data.data.segments[0].stats.deaths.value}`, inline: true },
                                        { name: 'Suicides', value: `${data.data.segments[0].stats.suicides.value}`, inline: true },
                                        { name: 'Teabags', value: `${data.data.segments[0].stats.teabags.value}`, inline: true },
                                        { name: 'Damage Dealt', value: `${data.data.segments[0].stats.damageDealt.value}`, inline: true },
                                        { name: 'Matches Played', value: `${data.data.segments[0].stats.matchesPlayed.value}`, inline: true },
                                        { name: 'Wins', value: `${data.data.segments[0].stats.wins.value}`, inline: true },
                                        { name: 'Losses', value: `${data.data.segments[0].stats.losses.value}`, inline: true },
                                        { name: 'Time Played', value: `${data.data.segments[0].stats.timePlayed.value}`, inline: true },
                                        { name: 'Progression XP', value: `${data.data.segments[0].stats.progressionXp.value}`, inline: true },
                                        { name: 'Progression Level', value: `${data.data.segments[0].stats.progressionLevel.value}`, inline: true },
                                        { name: 'Rank XP', value: `${data.data.segments[0].stats.rankXp.value}`, inline: true },
                                        { name: 'Rank Level', value: `${data.data.segments[0].stats.rankLevel.value}`, inline: true },
                                        { name: 'Shots Fired', value: `${data.data.segments[0].stats.shotsFired.value}`, inline: true },
                                        { name: 'Shots Landed', value: `${data.data.segments[0].stats.shotsLanded.value}`, inline: true }
                                    )
                                    .setFooter(`SplitStat`)
                                    .setTimestamp();
                
                                    collector.stop();
                                    return message.channel.send({ embeds: [playerEmbed] })
                                    } else if (msg.content.toLowerCase().startsWith(`streaks`)) {
                                        const streakEmbed = new MessageEmbed()
                                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                                        .setColor(`#2c1178`)
                                        .setTitle(`Streak Information`)
                                        .addFields(
                                            { name: 'King Slayers', value: `${data.data.segments[0].stats.kingSlayers.value}`, inline: true },
                                            { name: '50 Kills', value: `${data.data.segments[0].stats.medalKillstreak6.value}`, inline: true },
                                            { name: '25 Kills', value: `${data.data.segments[0].stats.medalKillstreak5.value}`, inline: true },
                                            { name: '20 Kills', value: `${data.data.segments[0].stats.medalKillstreak4.value}`, inline: true },
                                            { name: '15 Kills', value: `${data.data.segments[0].stats.medalKillstreak3.value}`, inline: true },
                                            { name: '10 Kills', value: `${data.data.segments[0].stats.medalKillstreak2.value}`, inline: true },
                                            { name: '5 kills', value: `${data.data.segments[0].stats.medalKillstreak1.value}`, inline: true }
                                        )
                                        .setFooter(`SplitStat`)
                                        .setTimestamp();
                    
                                        collector.stop();
                                        return message.channel.send({ embeds: [streakEmbed] })
                                    } else if (msg.content.toLowerCase().startsWith(`special`)) {
                                        const specialEmbed = new MessageEmbed()
                                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                                        .setColor(`#2c1178`)
                                        .setTitle(`Special Information`)
                                        .addFields(
                                            { name: 'Flags Picked Up', value: `${data.data.segments[0].stats.flagsPickedUp.value}`, inline: true },
                                            { name: 'Flags Returned', value: `${data.data.segments[0].stats.flagsReturned.value}`, inline: true },
                                            { name: 'Hills Captured', value: `${data.data.segments[0].stats.hillsCaptured.value}`, inline: true },
                                            { name: 'Hills Neutralized', value: `${data.data.segments[0].stats.hillsNeutralized.value}`, inline: true },
                                            { name: 'Oddballs Picked Up', value: `${data.data.segments[0].stats.oddballsPickedUp.value}`, inline: true },
                                            { name: 'Teabags Denied', value: `${data.data.segments[0].stats.teabagsDenied.value}`, inline: true }
                                        )
                                        .setFooter(`SplitStat`)
                                        .setTimestamp();
                    
                                        collector.stop();
                                        return message.channel.send({ embeds: [specialEmbed] })
                                    } else if (msg.content.toLowerCase().startsWith(`accuracy`)) {
                                        const accuracyEmbed = new MessageEmbed()
                                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                                        .setColor(`#2c1178`)
                                        .setTitle(`Accuracy Information`)
                                        .addFields(
                                            { name: 'Headshots Landed', value: `${data.data.segments[0].stats.headshotsLanded.value}`, inline: true },
                                            { name: 'Shots Accuracy', value: `${data.data.segments[0].stats.shotsAccuracy.value}`, inline: true },
                                            { name: 'Shots Landed', value: `${data.data.segments[0].stats.shotsLanded.value}`, inline: true },
                                            { name: 'Headhot Accuracy', value: `${data.data.segments[0].stats.headshotAccuracy.value}`, inline: true }
                                        )
                                        .setFooter(`SplitStat`)
                                        .setTimestamp();
                    
                                        collector.stop();
                                        return message.channel.send({ embeds: [accuracyEmbed] })
                                    } else if (msg.content.toLowerCase().startsWith(`cancel`)) {
                                        collector.stop();
                                        return msg.reply(`Okay! I'm not listening anymore.`);
                                    } else {
                                        collector.stop();
                                        msg.reply(`Sorry, but that isn't a category. Check **spl!cat** to see all categories and re-run this command when you've got one.`)
                                    }
                                })
                                })
                        } else if (msg.content.toLowerCase().startsWith(`steam`)) {
                            collector.stop();
                            const confirmation = await msg.reply(`Great! What's their Steam64ID? (see spl!stathelp on how to find this)`);
                            const filter = (m) => m.author.id === message.author.id;
                            const collector1 = confirmation.channel.createMessageCollector(filter, {
                                time: 60000,
                                });

                                collector1.on(`collect`, async (msgid) => {
                                    collector1.stop();
                                    var trnurl = `https://public-api.tracker.gg/v2/splitgate/standard/profile/steam/${msgid.content}`
                                    const data = await fetch(`${trnurl}`, {
                                        method: 'GET',
                                        headers: { 'TRN-Api-Key': `${config.botuser.trn_api}` }
                                    }).then(response => response.json());

                                    if(data.errors) {
                                        if(data.errors[0].code === "CollectorResultStatus::NotFound") {
                                            return msgid.reply(`Sorry, that user doesn't exist on Splitgate **Steam**.`)
                                        }
                                    }

                                    collector1.stop();
                                        const confirm = await message.reply(`Got it! Now ${message.author}, what would you like to see? You can say **CANCEL** if you need to find the categories in **spl!cat**.`)
                                const filter = (m) => m.author.id === message.author.id;
                                const collector = confirm.channel.createMessageCollector(filter, {
                                    time: 60000
                                });
                    
                                collector.on('collect', async (msg) => {
                                    if(msg.content.toLowerCase().startsWith(`portal`)) {
                                        const portalEmbed = new MessageEmbed()
                                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                                        .setTitle(`Portal Information`)
                                        .setColor(`#2c1178`)
                                        .setDescription(`All about portals. Kills through them, how many you've spawned etc.`)
                                        .addFields(
                                            { name: 'Portal Kills', value: `${data.data.segments[0].stats.portalKills.value}`},
                                            { name: 'Kills Through Portal', value: `${data.data.segments[0].stats.killsThruPortal.value}` },
                                            { name: 'Portals Spawned', value: `${data.data.segments[0].stats.portalsSpawned.value}` },
                                            { name: 'Own Portals Entered', value: `${data.data.segments[0].stats.ownPortalsEntered.value}` },
                                            { name: 'Enemy Portals Entered', value: `${data.data.segments[0].stats.enemyPortalsEntered.value}` },
                                            { name: 'Enemy Portals Destroyed', value: `${data.data.segments[0].stats.enemyPortalsDestroyed.value}` },
                                            { name: 'Distance Portaled', value: `${data.data.segments[0].stats.distancePortaled.value}` },
                                            { name: 'Ally Portals Entered', value: `${data.data.segments[0].stats.allyPortalsEntered.value}` }
                                        )
                                        .setFooter(`SplitStat`)
                                        .setTimestamp();
                    
                                        collector.stop();
                                        message.channel.send({ embeds: [portalEmbed] })
                                    } else if (msg.content.toLowerCase().startsWith(`kills`)) {
                                        const killEmbed = new MessageEmbed()
                                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                                        .setColor(`#2c1178`)
                                        .setTitle('Kills Information')
                                        .addFields(
                                            { name: `Kills on Hill`, value: `${data.data.segments[0].stats.enemyKillsOnHill.value}`, inline: true},
                                            { name: `First Bloods`, value: `${data.data.segments[0].stats.firstBloods.value}`, inline: true },
                                            { name: 'Flag Carrier Kills', value: `${data.data.segments[0].stats.flagCarrierKills.value}`, inline: true },
                                            { name: 'Flag Kills', value: `${data.data.segments[0].stats.flagKills.value}`, inline: true },
                                            { name: 'Highest Consecutive Kills', value: `${data.data.segments[0].stats.highestConsecutiveKills.value}`, inline: true },
                                            { name: 'Kills as VIP', value: `${data.data.segments[0].stats.killsAsVIP.value}`, inline: true },
                                            { name: 'Kills on Hill', value: `${data.data.segments[0].stats.killsOnHill.value}`, inline: true },
                                            { name: 'Oddball Kills', value: `${data.data.segments[0].stats.oddballKills.value}`, inline: true },
                                            { name: 'Revenge Kills', value: `${data.data.segments[0].stats.revengeKills.value}`, inline: true },
                                            { name: 'Kills Per Match', value: `${data.data.segments[0].stats.killsPerMatch.value}`, inline: true }, 
                                            { name: 'Kills Per Minute', value: `${data.data.segments[0].stats.killsPerMinute.value}`, inline: true },
                                            { name: 'Headshot Kills', value: `${data.data.segments[0].stats.headshotKills.value}`, inline: true },
                                            { name: 'Collaterals', value: `${data.data.segments[0].stats.collaterals.value}`, inline: true },
                                            { name: 'Melee Kills', value: `${data.data.segments[0].stats.meleeKills.value}`, inline: true },
                                            { name: 'Assists', value: `${data.data.segments[0].stats.assists.value}`, inline: true },
                                            { name: 'Total Kills', value: `${data.data.segments[0].stats.kills.value}`, inline: true }
                                        )
                                        .setFooter(`SplitStat`)
                                        .setTimestamp();
                    
                                        collector.stop();
                                        return message.channel.send({ embeds: [killEmbed] })
                                    } else if (msg.content.toLowerCase().startsWith(`player`)) {
                                        const playerEmbed = new MessageEmbed()
                                    .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                                    .setColor(`#2c1178`)
                                    .setTitle(`Player Information`)
                                    .addFields(
                                        { name: 'KD', value: `${data.data.segments[0].stats.kd.value}`, inline: true },
                                        { name: 'KAD', value: `${data.data.segments[0].stats.kad.value}`, inline: true },
                                        { name: 'Points', value: `${data.data.segments[0].stats.points.value}`, inline: true },
                                        { name: 'Deaths', value: `${data.data.segments[0].stats.deaths.value}`, inline: true },
                                        { name: 'Suicides', value: `${data.data.segments[0].stats.suicides.value}`, inline: true },
                                        { name: 'Teabags', value: `${data.data.segments[0].stats.teabags.value}`, inline: true },
                                        { name: 'Damage Dealt', value: `${data.data.segments[0].stats.damageDealt.value}`, inline: true },
                                        { name: 'Matches Played', value: `${data.data.segments[0].stats.matchesPlayed.value}`, inline: true },
                                        { name: 'Wins', value: `${data.data.segments[0].stats.wins.value}`, inline: true },
                                        { name: 'Losses', value: `${data.data.segments[0].stats.losses.value}`, inline: true },
                                        { name: 'Time Played', value: `${data.data.segments[0].stats.timePlayed.value}`, inline: true },
                                        { name: 'Progression XP', value: `${data.data.segments[0].stats.progressionXp.value}`, inline: true },
                                        { name: 'Progression Level', value: `${data.data.segments[0].stats.progressionLevel.value}`, inline: true },
                                        { name: 'Rank XP', value: `${data.data.segments[0].stats.rankXp.value}`, inline: true },
                                        { name: 'Rank Level', value: `${data.data.segments[0].stats.rankLevel.value}`, inline: true },
                                        { name: 'Shots Fired', value: `${data.data.segments[0].stats.shotsFired.value}`, inline: true },
                                        { name: 'Shots Landed', value: `${data.data.segments[0].stats.shotsLanded.value}`, inline: true }
                                    )
                                    .setFooter(`SplitStat`)
                                    .setTimestamp();
                
                                    collector.stop();
                                    return message.channel.send({ embeds: [playerEmbed] })
                                    } else if (msg.content.toLowerCase().startsWith(`streaks`)) {
                                        const streakEmbed = new MessageEmbed()
                                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                                        .setColor(`#2c1178`)
                                        .setTitle(`Streak Information`)
                                        .addFields(
                                            { name: 'King Slayers', value: `${data.data.segments[0].stats.kingSlayers.value}`, inline: true },
                                            { name: '50 Kills', value: `${data.data.segments[0].stats.medalKillstreak6.value}`, inline: true },
                                            { name: '25 Kills', value: `${data.data.segments[0].stats.medalKillstreak5.value}`, inline: true },
                                            { name: '20 Kills', value: `${data.data.segments[0].stats.medalKillstreak4.value}`, inline: true },
                                            { name: '15 Kills', value: `${data.data.segments[0].stats.medalKillstreak3.value}`, inline: true },
                                            { name: '10 Kills', value: `${data.data.segments[0].stats.medalKillstreak2.value}`, inline: true },
                                            { name: '5 kills', value: `${data.data.segments[0].stats.medalKillstreak1.value}`, inline: true }
                                        )
                                        .setFooter(`SplitStat`)
                                        .setTimestamp();
                    
                                        collector.stop();
                                        return message.channel.send({ embeds: [streakEmbed] })
                                    } else if (msg.content.toLowerCase().startsWith(`special`)) {
                                        const specialEmbed = new MessageEmbed()
                                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                                        .setColor(`#2c1178`)
                                        .setTitle(`Special Information`)
                                        .addFields(
                                            { name: 'Flags Picked Up', value: `${data.data.segments[0].stats.flagsPickedUp.value}`, inline: true },
                                            { name: 'Flags Returned', value: `${data.data.segments[0].stats.flagsReturned.value}`, inline: true },
                                            { name: 'Hills Captured', value: `${data.data.segments[0].stats.hillsCaptured.value}`, inline: true },
                                            { name: 'Hills Neutralized', value: `${data.data.segments[0].stats.hillsNeutralized.value}`, inline: true },
                                            { name: 'Oddballs Picked Up', value: `${data.data.segments[0].stats.oddballsPickedUp.value}`, inline: true },
                                            { name: 'Teabags Denied', value: `${data.data.segments[0].stats.teabagsDenied.value}`, inline: true }
                                        )
                                        .setFooter(`SplitStat`)
                                        .setTimestamp();
                    
                                        collector.stop();
                                        return message.channel.send({ embeds: [specialEmbed] })
                                    } else if (msg.content.toLowerCase().startsWith(`accuracy`)) {
                                        const accuracyEmbed = new MessageEmbed()
                                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                                        .setColor(`#2c1178`)
                                        .setTitle(`Accuracy Information`)
                                        .addFields(
                                            { name: 'Headshots Landed', value: `${data.data.segments[0].stats.headshotsLanded.value}`, inline: true },
                                            { name: 'Shots Accuracy', value: `${data.data.segments[0].stats.shotsAccuracy.value}`, inline: true },
                                            { name: 'Shots Landed', value: `${data.data.segments[0].stats.shotsLanded.value}`, inline: true },
                                            { name: 'Headhot Accuracy', value: `${data.data.segments[0].stats.headshotAccuracy.value}`, inline: true }
                                        )
                                        .setFooter(`SplitStat`)
                                        .setTimestamp();
                    
                                        collector.stop();
                                        return message.channel.send({ embeds: [accuracyEmbed] })
                                    } else if (msg.content.toLowerCase().startsWith(`cancel`)) {
                                        collector.stop();
                                        return msg.reply(`Okay! I'm not listening anymore.`);
                                    } else {
                                        collector.stop();
                                        msg.reply(`Sorry, but that isn't a category. Check **spl!cat** to see all categories and re-run this command when you've got one.`)
                                    }
                                })
                                })
                        } else if (msg.content.toLowerCase().startsWith(`playstation`)) {
                            collector.stop();
                            const confirmation = await msg.reply(`Great! What's their username?`);
                            const filter = (m) => m.author.id === message.author.id;
                            const collector1 = confirmation.channel.createMessageCollector(filter, {
                                time: 60000,
                                });

                                collector1.on(`collect`, async (msgid) => {
                                    var trnurl = `https://public-api.tracker.gg/v2/splitgate/standard/profile/psn/${msgid.content}`
                                    const data = await fetch(`${trnurl}`, {
                                        method: 'GET',
                                        headers: { 'TRN-Api-Key': `${config.botuser.trn_api}` }
                                    }).then(response => response.json());

                                    collector1.stop();
                                    if(data.errors) {
                                        if(data.errors[0].code === "CollectorResultStatus::NotFound") {
                                            return msgid.reply(`Sorry, that user doesn't exist on Splitgate **Playstation**.`)
                                        }
                                    }

                                    collector1.stop();
                                        const confirm = await message.reply(`Got it! Now ${message.author}, what would you like to see? You can say **CANCEL** if you need to find the categories in **spl!cat**.`)
                                const filter = (m) => m.author.id === message.author.id;
                                const collector = confirm.channel.createMessageCollector(filter, {
                                    time: 60000
                                });
                    
                                collector.on('collect', async (msg) => {
                                    if(msg.content.toLowerCase().startsWith(`portal`)) {
                                        const portalEmbed = new MessageEmbed()
                                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                                        .setTitle(`Portal Information`)
                                        .setColor(`#2c1178`)
                                        .setDescription(`All about portals. Kills through them, how many you've spawned etc.`)
                                        .addFields(
                                            { name: 'Portal Kills', value: `${data.data.segments[0].stats.portalKills.value}`},
                                            { name: 'Kills Through Portal', value: `${data.data.segments[0].stats.killsThruPortal.value}` },
                                            { name: 'Portals Spawned', value: `${data.data.segments[0].stats.portalsSpawned.value}` },
                                            { name: 'Own Portals Entered', value: `${data.data.segments[0].stats.ownPortalsEntered.value}` },
                                            { name: 'Enemy Portals Entered', value: `${data.data.segments[0].stats.enemyPortalsEntered.value}` },
                                            { name: 'Enemy Portals Destroyed', value: `${data.data.segments[0].stats.enemyPortalsDestroyed.value}` },
                                            { name: 'Distance Portaled', value: `${data.data.segments[0].stats.distancePortaled.value}` },
                                            { name: 'Ally Portals Entered', value: `${data.data.segments[0].stats.allyPortalsEntered.value}` }
                                        )
                                        .setFooter(`SplitStat`)
                                        .setTimestamp();
                    
                                        collector.stop();
                                        message.channel.send({ embeds: [portalEmbed] })
                                    } else if (msg.content.toLowerCase().startsWith(`kills`)) {
                                        const killEmbed = new MessageEmbed()
                                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                                        .setColor(`#2c1178`)
                                        .setTitle('Kills Information')
                                        .addFields(
                                            { name: `Kills on Hill`, value: `${data.data.segments[0].stats.enemyKillsOnHill.value}`, inline: true},
                                            { name: `First Bloods`, value: `${data.data.segments[0].stats.firstBloods.value}`, inline: true },
                                            { name: 'Flag Carrier Kills', value: `${data.data.segments[0].stats.flagCarrierKills.value}`, inline: true },
                                            { name: 'Flag Kills', value: `${data.data.segments[0].stats.flagKills.value}`, inline: true },
                                            { name: 'Highest Consecutive Kills', value: `${data.data.segments[0].stats.highestConsecutiveKills.value}`, inline: true },
                                            { name: 'Kills as VIP', value: `${data.data.segments[0].stats.killsAsVIP.value}`, inline: true },
                                            { name: 'Kills on Hill', value: `${data.data.segments[0].stats.killsOnHill.value}`, inline: true },
                                            { name: 'Oddball Kills', value: `${data.data.segments[0].stats.oddballKills.value}`, inline: true },
                                            { name: 'Revenge Kills', value: `${data.data.segments[0].stats.revengeKills.value}`, inline: true },
                                            { name: 'Kills Per Match', value: `${data.data.segments[0].stats.killsPerMatch.value}`, inline: true }, 
                                            { name: 'Kills Per Minute', value: `${data.data.segments[0].stats.killsPerMinute.value}`, inline: true },
                                            { name: 'Headshot Kills', value: `${data.data.segments[0].stats.headshotKills.value}`, inline: true },
                                            { name: 'Collaterals', value: `${data.data.segments[0].stats.collaterals.value}`, inline: true },
                                            { name: 'Melee Kills', value: `${data.data.segments[0].stats.meleeKills.value}`, inline: true },
                                            { name: 'Assists', value: `${data.data.segments[0].stats.assists.value}`, inline: true },
                                            { name: 'Total Kills', value: `${data.data.segments[0].stats.kills.value}`, inline: true }
                                        )
                                        .setFooter(`SplitStat`)
                                        .setTimestamp();
                    
                                        collector.stop();
                                        return message.channel.send({ embeds: [killEmbed] })
                                    } else if (msg.content.toLowerCase().startsWith(`player`)) {
                                        const playerEmbed = new MessageEmbed()
                                    .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                                    .setColor(`#2c1178`)
                                    .setTitle(`Player Information`)
                                    .addFields(
                                        { name: 'KD', value: `${data.data.segments[0].stats.kd.value}`, inline: true },
                                        { name: 'KAD', value: `${data.data.segments[0].stats.kad.value}`, inline: true },
                                        { name: 'Points', value: `${data.data.segments[0].stats.points.value}`, inline: true },
                                        { name: 'Deaths', value: `${data.data.segments[0].stats.deaths.value}`, inline: true },
                                        { name: 'Suicides', value: `${data.data.segments[0].stats.suicides.value}`, inline: true },
                                        { name: 'Teabags', value: `${data.data.segments[0].stats.teabags.value}`, inline: true },
                                        { name: 'Damage Dealt', value: `${data.data.segments[0].stats.damageDealt.value}`, inline: true },
                                        { name: 'Matches Played', value: `${data.data.segments[0].stats.matchesPlayed.value}`, inline: true },
                                        { name: 'Wins', value: `${data.data.segments[0].stats.wins.value}`, inline: true },
                                        { name: 'Losses', value: `${data.data.segments[0].stats.losses.value}`, inline: true },
                                        { name: 'Time Played', value: `${data.data.segments[0].stats.timePlayed.value}`, inline: true },
                                        { name: 'Progression XP', value: `${data.data.segments[0].stats.progressionXp.value}`, inline: true },
                                        { name: 'Progression Level', value: `${data.data.segments[0].stats.progressionLevel.value}`, inline: true },
                                        { name: 'Rank XP', value: `${data.data.segments[0].stats.rankXp.value}`, inline: true },
                                        { name: 'Rank Level', value: `${data.data.segments[0].stats.rankLevel.value}`, inline: true },
                                        { name: 'Shots Fired', value: `${data.data.segments[0].stats.shotsFired.value}`, inline: true },
                                        { name: 'Shots Landed', value: `${data.data.segments[0].stats.shotsLanded.value}`, inline: true }
                                    )
                                    .setFooter(`SplitStat`)
                                    .setTimestamp();
                
                                    collector.stop();
                                    return message.channel.send({ embeds: [playerEmbed] })
                                    } else if (msg.content.toLowerCase().startsWith(`streaks`)) {
                                        const streakEmbed = new MessageEmbed()
                                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                                        .setColor(`#2c1178`)
                                        .setTitle(`Streak Information`)
                                        .addFields(
                                            { name: 'King Slayers', value: `${data.data.segments[0].stats.kingSlayers.value}`, inline: true },
                                            { name: '50 Kills', value: `${data.data.segments[0].stats.medalKillstreak6.value}`, inline: true },
                                            { name: '25 Kills', value: `${data.data.segments[0].stats.medalKillstreak5.value}`, inline: true },
                                            { name: '20 Kills', value: `${data.data.segments[0].stats.medalKillstreak4.value}`, inline: true },
                                            { name: '15 Kills', value: `${data.data.segments[0].stats.medalKillstreak3.value}`, inline: true },
                                            { name: '10 Kills', value: `${data.data.segments[0].stats.medalKillstreak2.value}`, inline: true },
                                            { name: '5 kills', value: `${data.data.segments[0].stats.medalKillstreak1.value}`, inline: true }
                                        )
                                        .setFooter(`SplitStat`)
                                        .setTimestamp();
                    
                                        collector.stop();
                                        return message.channel.send({ embeds: [streakEmbed] })
                                    } else if (msg.content.toLowerCase().startsWith(`special`)) {
                                        const specialEmbed = new MessageEmbed()
                                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                                        .setColor(`#2c1178`)
                                        .setTitle(`Special Information`)
                                        .addFields(
                                            { name: 'Flags Picked Up', value: `${data.data.segments[0].stats.flagsPickedUp.value}`, inline: true },
                                            { name: 'Flags Returned', value: `${data.data.segments[0].stats.flagsReturned.value}`, inline: true },
                                            { name: 'Hills Captured', value: `${data.data.segments[0].stats.hillsCaptured.value}`, inline: true },
                                            { name: 'Hills Neutralized', value: `${data.data.segments[0].stats.hillsNeutralized.value}`, inline: true },
                                            { name: 'Oddballs Picked Up', value: `${data.data.segments[0].stats.oddballsPickedUp.value}`, inline: true },
                                            { name: 'Teabags Denied', value: `${data.data.segments[0].stats.teabagsDenied.value}`, inline: true }
                                        )
                                        .setFooter(`SplitStat`)
                                        .setTimestamp();
                    
                                        collector.stop();
                                        return message.channel.send({ embeds: [specialEmbed] })
                                    } else if (msg.content.toLowerCase().startsWith(`accuracy`)) {
                                        const accuracyEmbed = new MessageEmbed()
                                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                                        .setColor(`#2c1178`)
                                        .setTitle(`Accuracy Information`)
                                        .addFields(
                                            { name: 'Headshots Landed', value: `${data.data.segments[0].stats.headshotsLanded.value}`, inline: true },
                                            { name: 'Shots Accuracy', value: `${data.data.segments[0].stats.shotsAccuracy.value}`, inline: true },
                                            { name: 'Shots Landed', value: `${data.data.segments[0].stats.shotsLanded.value}`, inline: true },
                                            { name: 'Headhot Accuracy', value: `${data.data.segments[0].stats.headshotAccuracy.value}`, inline: true }
                                        )
                                        .setFooter(`SplitStat`)
                                        .setTimestamp();
                    
                                        collector.stop();
                                        return message.channel.send({ embeds: [accuracyEmbed] })
                                    } else if (msg.content.toLowerCase().startsWith(`cancel`)) {
                                        collector.stop();
                                        return msg.reply(`Okay! I'm not listening anymore.`);
                                    } else {
                                        collector.stop();
                                        msg.reply(`Sorry, but that isn't a category. Check **spl!cat** to see all categories and re-run this command when you've got one.`)
                                    }
                                })
                                })
                        }
                    })
            }
        }
    }
}