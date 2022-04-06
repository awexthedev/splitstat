const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');
const fetch = require('../modules/fetch_stats');
const err = require('../modules/error');
const catTypes = require('../modules/types');

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
            .setDescription(`Your ID/Gamertag! For Steam, use your Steam Profile URL!.`)
            .setRequired(true)))
    .addStringOption(option => (
        option.setName(`category`)
            .setDescription(`The category of your choice!`)
            .setRequired(true)
            .addChoice('Kills', 'Kills')
            .addChoice('Portals', 'Portals')
            .addChoice('Accuracy', 'Accuracy')
            .addChoice('Streaks', 'Streaks')
            .addChoice('Player', 'Player')
            .addChoice('Playlist', 'Playlist')
    )),
    info: {
        "name": 'Lookup',
        "description": "The main thing! Look up your username to get the latest, real-time stats!",
        "image": "https://scr.awexxx.xyz/upload?view=DiscordCanary_1dJ1mOhKrX.png",
        "usage": "/lookup [xbl, psn, steam] [user] [category]",
        "requireArgs": true
    },
    async execute(interaction, args) {
        const platform = args[0];
        const player = args[1];
        const category = args[2];

        var data = await fetch(platform, player)
        .catch(function (error) {
            err.genericHttpError(interaction, error);
        })

        const statsEmbed = new discord.MessageEmbed()
        .setAuthor({ name: `${data.trn.platformInfo.platformUserHandle}'s Stats`, iconURL: data.avatar, url: "https://tracker.gg/splitgate/profile/" + platform + "/" + data.id }) 
        .setColor(`#2c1178`)
        .setTitle(`${category} Information`)
        .setFooter({ text: `SplitStat | Need help? thatalex.dev/splitstat` })
        .setTimestamp();

        var stat = catTypes[category.toLowerCase()];
        for(var i = 0; i < stat.length; i++) {
            console.log(data.trn.segments[0].stats[stat[i]])
            statsEmbed.addField(data.trn.segments[0].stats[stat[i]].displayName, data.trn.segments[0].stats[stat[i]].displayValue);
        }

        return await interaction.reply({ embeds: [statsEmbed] });
    }
}