const discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetching = require('../modules/redis-handler');

module.exports = {
    name: 'match',
    data: new SlashCommandBuilder()
              .setName(`match`)
              .setDescription(`Get your most recent matches, or check specific ones!`)
              .addStringOption(option => (
                  option.setName(`platform`)
                        .setDescription(`Platform you're on.`)
                        .setRequired(true)
                        .addChoice('Xbox', 'xbl')
                        .addChoice('PlayStation', 'psn')
                        .addChoice('Steam', 'steam')
              ))
              .addStringOption(option => (
                option.setName(`player`)
                      .setDescription(`Your ID/Gamertag! For Steam, your Steam Profile URL!`)
                      .setRequired(true)
              ))
              .addStringOption(option => (
                  option.setName(`id`)
                        .setDescription(`Specific Match ID to search for`)
              )),
    info: {
        "name": "match",
        "description": "Search for a specific Match ID! Run without any id argument to see some of your recent matches!",
        "image": null,
        "usage": "/match [platform] [player] [id]"
    },
    async execute(interaction) {
        const platform = interaction.options.getString(`platform`);
        const player = interaction.options.getString(`player`);
        const id = interaction.options.getString(`id`);

        if(!id) {
            await fetching.fetchMatchData(player.toLowerCase(), platform);

            var data = fetching.data

            const recentEmbed = new discord.MessageEmbed()
            .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
            .setColor(`#2c1178`)
            .setTitle(`${data.username} -- ${platform} | Recent Matches`)
            .addFields(
                { name: `${data.matchMetadata[0].id}`, value: `on ${data.matchMetadata[0].mapName} | ${data.matchMetadata[0].queue}`, inline: true },
                { name: `${data.matchMetadata[1].id}`, value: `on ${data.matchMetadata[1].mapName} | ${data.matchMetadata[1].queue}`, inline: true },
                { name: `${data.matchMetadata[2].id}`, value: `on ${data.matchMetadata[2].mapName} | ${data.matchMetadata[2].queue}`, inline: true },
                { name: `${data.matchMetadata[3].id}`, value: `on ${data.matchMetadata[3].mapName} | ${data.matchMetadata[3].queue}`, inline: true },
                { name: `${data.matchMetadata[4].id}`, value: `on ${data.matchMetadata[4].mapName} | ${data.matchMetadata[4].queue}`, inline: true }
            )
            .setFooter(`SplitStat | /discord`)
            .setTimestamp();

            await interaction.reply({ embeds: [recentEmbed] })
        } else {
            await fetching.fetchMatchData(player.toLowerCase(), platform, id);

            console.log(fetching.data)
            var data = fetching.data

            const statEmbed = new discord.MessageEmbed()
            .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
            .setColor(`#2c1178`)
            .setTitle(`${data.username} -- ${platform} | Match Stats`)
            .setImage(`${data.matchData.mapImage}`)
            .addFields(
                { name: `Map Name`, value: `${data.matchData.mapDisplay}`, inline: true },
                { name: `Won?`, value: `${data.matchData.isWinner}`, inline: true },
                { name: `Points`, value: `${data.matchData.points}`, inline: true },
                { name: `Playlist`, value: `${data.matchData.playlist}`, inline: true },
                { name: `Mode`, value: `${data.matchData.mode}`, inline: true } 
            )
            .setFooter(`SplitStat | /discord`)
            .setTimestamp();

            return await interaction.reply({ embeds: [statEmbed] })
        }
    }
}