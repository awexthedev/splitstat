const fetch = require('node-fetch');

var global = {}

module.exports = {
    name: 'stat',
    async execute(client, discord, message, args) {
        if(!args.length) {
            const missingArgs = new discord.MessageEmbed()
            .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
            .setColor(`#2c1178`)
            .setTitle(`Not so fast!`)
            .setDescription(`Hey! Slow down, you're not getting anything without a Steam vanity URL value!
            To learn how to find that, please run **spl!idhelp** and then add into spl!stat (spl!stat [steam-url-value], ex. spl!stat _awexxx)`)
        
            return message.reply({ embeds: [missingArgs] });
        } else {
            const username = args.slice(0).join(' ');

            if(global.msg === `No match`) {
                return message.channel.send(`Sorry, but that Steam Vanity URL had no match via Steam's API. Please make sure you're using the value you set for your **custom URL**, not the entire URL.`)
            }

            const confirmation = await message.channel.send(`Got a response, ${message.author}! Now, what would you like to see? You can say **CANCEL** if you need to find the categories in **spl!cat**.`);
            const filter = (m) => m.author.id === message.author.id;
            const collector = confirmation.channel.createMessageCollector(filter, {
                time: 60000,
                });

            await getSteamId(username);

            var url = `https://public-api.tracker.gg/v2/splitgate/standard/profile/steam/${global.id}`
            const data = await fetch(`${url}`, {
                method: 'GET',
                headers: { 'TRN-Api-Key': `${process.env.api_key}` }
            }).then(response => response.json());

            if(!data.data || data.data.segments === undefined) {
                const errorEmbed = new discord.MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setTitle(`Well. This is embarassing.`)
                .setColor(`#2c1178`)
                .setDescription(`An incorrect ID was provided or there is an internal API error.\nTo fix this, make sure you used your Steam vanity URL value to search. (See **spl!idhelp** for more information.)`)
                .setFooter(`SplitStat`)
                .setTimestamp();

                return message.channel.send({ embeds: [errorEmbed] })
            }
            
            collector.on('collect', async (msg) => {
                if(msg.content.toLowerCase().startsWith(`portal`)) {
                    const portalEmbed = new discord.MessageEmbed()
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
                } else if(msg.content.toLowerCase().startsWith(`kills`)) {
                    const killEmbed = new discord.MessageEmbed()
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
                    const playerEmbed = new discord.MessageEmbed()
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
                    const streakEmbed = new discord.MessageEmbed()
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
                    const specialEmbed = new discord.MessageEmbed()
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
                    const accuracyEmbed = new discord.MessageEmbed()
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
                    return msg.channel.send(`Okay! I've stopped listening.`)
                } else {
                    collector.stop();
                    return message.channel.send(`Sorry, that isn't a category. Please check **pcn!cat** to see all the categories.`)
                }
            })
        }
    }
}

async function getSteamId(username) {
    var url_steam = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.steam_key}&vanityurl=${username}`

    var { response } = await fetch(`${url_steam}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    }).then(response => response.json()).catch(err => {
        console.log(err)
    })

    global.id = response.steamid
    global.msg = response.message
}