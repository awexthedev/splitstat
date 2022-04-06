const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');

module.exports = {
    name: 'help',
    info: {
        "name": 'Help',
        "description": "Find out how to work this bot!",
        "image": null,
        "usage": "/help [command]",
        "requireArgs": true
    },
    data: new SlashCommandBuilder()
        .setName(`help`)
        .setDescription(`Help with the SplitStat bot!`)
        .addStringOption(option => 
            option.setName(`command`)
                .setDescription(`Find out how a command works!`)
                .setRequired(true)
                .addChoice("Lookup", "lookup")
                .addChoice("Match", "match")
                .addChoice("Ping", "ping")
                .addChoice("Search", "search")
                ),
    async execute(interaction, args) {
    try {
        var command = require(__dirname + `/${args[0]}.js`);
    } catch(err) {
        if(err) {
            return interaction.reply(`Sorry, something went wrong. That command likely doesn't exist on the server.`)
        }
    }

        const helpEmbed = new discord.MessageEmbed()
        .setAuthor({ name: `SplitStat Bot`, iconURL: `https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png` })
        .setTitle(`Command Help - ${command.info.name}`)
        .setDescription(command.info.description)
        .addFields(
            { name: 'Usage', value: `${command.info.usage}` }
        )
        .setColor(`#2c1178`)
        .setFooter({ text: `SplitStat | Need help? thatalex.dev/splitstat` })
        .setTimestamp();

        if(command.info.image !== null) {
            helpEmbed.setImage(command.info.image)
        }

        return await interaction.reply({ embeds: [ helpEmbed ] })
    }
}