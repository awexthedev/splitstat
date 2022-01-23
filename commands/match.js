const discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetchMatch = require('../modules/fetch_match');

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
        "description": "Search for a specific Match ID! Run without an id to see some of your recent matches!",
        "image": null,
        "usage": "/match [platform] [player] [id]",
        "requireArgs": true,
    },
    async execute(interaction, args) {
        const platform = args[0];
        const player = args[1];
        const id = args[2];
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

        if(!id) {
            var data = await fetchMatch(null, platform.toLowerCase(), player);
            const recentEmbed = new discord.MessageEmbed()
            .setAuthor({ name: `${data.username} -- ${platform}`, iconURL: data.avatar })
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
            var data = await fetchMatch(id, platform.toLowerCase(), player, false);
            const statEmbed = new discord.MessageEmbed()
            .setAuthor({ name: `${data.username} -- ${platform}`, iconURL: data.avatar })
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
    }
}