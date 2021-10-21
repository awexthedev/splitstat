const redis = require('../modules/redis-handler');
const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');

const redisPack = require('async-redis');
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
            .addChoice('Kills', 'Kills')
            .addChoice('Portals', 'Portals')
            .addChoice('Special', 'Special')
            .addChoice('Accuracy', 'Accuracy')
            .addChoice('Streaks', 'Streaks')
            .addChoice('Player', 'Player')
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

        await redis.cacheData(player.toLowerCase(), platform)

        var cacheThis = await rc.get(player)
        var value = JSON.parse(cacheThis)

        const statsEmbed = new discord.MessageEmbed()
        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
        .setColor(`#2c1178`)
        .setTitle(`${category} Information`)
        .setFooter(`SplitStat | /discord`)
        .setTimestamp();

        switch(category.toLowerCase()) {
            case `kills`:
                statsEmbed.addFields(
                    { name: `Kills on Hill`, value: `${value.killData.killsOnHill}`, inline: true},
                    { name: `First Bloods`, value: `${value.killData.firstBloods}`, inline: true },
                    { name: 'Flag Carrier Kills', value: `${value.killData.flagCarrierKills}`, inline: true },
                    { name: 'Flag Kills', value: `${value.killData.flagKills}`, inline: true },
                    { name: 'Highest Consecutive Kills', value: `${value.killData.highestConsecutiveKills}`, inline: true },
                    { name: 'Kills as VIP', value: `${value.killData.killsAsVIP}`, inline: true },
                    { name: 'Kills on Hill', value: `${value.killData.killsOnHill}`, inline: true },
                    { name: 'Oddball Kills', value: `${value.killData.oddballKills}`, inline: true },
                    { name: 'Revenge Kills', value: `${value.killData.revengeKills}`, inline: true },
                    { name: 'Kills Per Match', value: `${value.killData.killsPerMatch}`, inline: true }, 
                    { name: 'Kills Per Minute', value: `${value.killData.killsPerMinute}`, inline: true },
                    { name: 'Headshot Kills', value: `${value.killData.headshotKills}`, inline: true },
                    { name: 'Collaterals', value: `${value.killData.collaterals}`, inline: true },
                    { name: 'Melee Kills', value: `${value.killData.meleeKills}`, inline: true },
                    { name: 'Assists', value: `${value.killData.assists}`, inline: true },
                    { name: 'Total Kills', value: `${value.killData.kills}`, inline: true }
                )
                break;
            case `player`:
                statsEmbed.addFields(
                    { name: 'KD', value: `${value.playerData.kd}`, inline: true },
                    { name: 'KAD', value: `${value.playerData.kad}`, inline: true },
                    { name: 'Points', value: `${value.playerData.points}`, inline: true },
                    { name: 'Deaths', value: `${value.playerData.deaths}`, inline: true },
                    { name: 'Suicides', value: `${value.playerData.suicides}`, inline: true },
                    { name: 'Teabags', value: `${value.playerData.teabags}`, inline: true },
                    { name: 'Damage Dealt', value: `${value.playerData.damageDealt}`, inline: true },
                    { name: 'Matches Played', value: `${value.playerData.matchesPlayed}`, inline: true },
                    { name: 'Wins', value: `${value.playerData.wins}`, inline: true },
                    { name: 'Losses', value: `${value.playerData.losses}`, inline: true },
                    { name: 'Time Played', value: `${value.playerData.timePlayed}`, inline: true },
                    { name: 'Progression XP', value: `${value.playerData.progressionXp}`, inline: true },
                    { name: 'Progression Level', value: `${value.playerData.progressionLevel}`, inline: true },
                    { name: 'Rank XP', value: `${value.playerData.rankXp}`, inline: true },
                    { name: 'Rank Level', value: `${value.playerData.rankLevel}`, inline: true },
                    { name: 'Shots Fired', value: `${value.playerData.shotsFired}`, inline: true },
                    { name: 'Shots Landed', value: `${value.playerData.shotsLanded}`, inline: true }
                )
                break;
            case `accuracy`:
                statsEmbed.addFields(
                    { name: 'Headshots Landed', value: `${value.accuracyData.headshotsLanded}`, inline: true },
                    { name: 'Shots Accuracy', value: `${value.accuracyData.shotsAccuracy}`, inline: true },
                    { name: 'Shots Landed', value: `${value.accuracyData.shotsLanded}`, inline: true },
                    { name: 'Headshot Accuracy', value: `${value.accuracyData.headshotAccuracy}`, inline: true }
                )
                break;
            case `special`:
                statsEmbed.addFields(
                    { name: 'Flags Picked Up', value: `${value.specialData.flagsPickedUp}`, inline: true },
                    { name: 'Flags Returned', value: `${value.specialData.flagsReturned}`, inline: true },
                    { name: 'Hills Captured', value: `${value.specialData.hillsCaptured}`, inline: true },
                    { name: 'Hills Neutralized', value: `${value.specialData.hillsNeutralized}`, inline: true },
                    { name: 'Oddballs Picked Up', value: `${value.specialData.oddballsPickedUp}`, inline: true },
                    { name: 'Teabags Denied', value: `${value.specialData.teabagsDenied}`, inline: true }
                )
                break;
            case `portals`:
                statsEmbed.addFields(
                    { name: 'Portal Kills', value: `${value.portalData.portalKills}`},
                    { name: 'Kills Through Portal', value: `${value.portalData.killsThruPortal}` },
                    { name: 'Portals Spawned', value: `${value.portalData.portalsSpawned}` },
                    { name: 'Own Portals Entered', value: `${value.portalData.ownPortalsEntered}` },
                    { name: 'Enemy Portals Entered', value: `${value.portalData.enemyPortalsEntered}` },
                    { name: 'Enemy Portals Destroyed', value: `${value.portalData.enemyPortalsDestroyed}` },
                    { name: 'Distance Portaled', value: `${value.portalData.distancePortaled}` },
                    { name: 'Ally Portals Entered', value: `${value.portalData.allyPortalsEntered}` }
                )
                break;
            case `streaks`:
                statsEmbed.addFields(
                    { name: 'King Slayers', value: `${value.streakData.kingSlayers}`, inline: true },
                    { name: '50 Kills', value: `${value.streakData.killstreak6}`, inline: true },
                    { name: '25 Kills', value: `${value.streakData.killstreak5}`, inline: true },
                    { name: '20 Kills', value: `${value.streakData.killstreak4}`, inline: true },
                    { name: '15 Kills', value: `${value.streakData.killstreak3}`, inline: true },
                    { name: '10 Kills', value: `${value.streakData.killstreak2}`, inline: true },
                    { name: '5 kills', value: `${value.streakData.killstreak1}`, inline: true }
                )
                break;
        }

        return await interaction.reply({ embeds: [statsEmbed] });
    }
}