const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');

module.exports = {
    name: 'help',
    info: {
        "name": 'Help',
        "description": "Find out how to work this bot!",
        "image": null,
        "usage": "/help [command]"
    },
    data: new SlashCommandBuilder()
        .setName(`help`)
        .setDescription(`Help with the SplitStat bot!`)
        .addStringOption(option => 
            option.setName(`command`)
                .setDescription(`Find out how a command works!`)
                .setRequired(true)
                .addChoice(`Lookup`, 'lookup')
                .addChoice(`Profile`, 'profile')
                .addChoice(`Ping`, `ping`)
                .addChoice(`Changelog`, `changelog`)
                .addChoice(`Complain`, `complain`)
                .addChoice(`Discord`, `discord`)
                .addChoice('Match', `match`)
                .addChoice('Medal', `medal`)
                .addChoice(`Info`, `info`)),
    async execute(interaction) {
        var option = interaction.options.getString(`command`);
        const command = require(__dirname + `/${option}.js`)

        const helpEmbed = new discord.MessageEmbed()
        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
        .setTitle(`Command Help - ${command.info.name}`)
        .setDescription(command.info.description)
        .addFields(
            { name: 'Usage', value: `${command.info.usage}` }
        )
        .setColor(`#2c1178`)
        .setFooter(`SplitStat | /discord`)
        .setTimestamp();

        if(command.info.image !== null) {
            helpEmbed.setImage(command.info.image)
        }

        return await interaction.reply({ embeds: [ helpEmbed ] })
    }
}