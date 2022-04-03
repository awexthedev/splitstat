const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');
const fs = require('fs')

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
                .setRequired(false)),
    async execute(interaction, args) {
        if(!args[0]) {
            const helpEmbed = new discord.MessageEmbed()
            .setAuthor({ name: `SplitStat Bot`, iconURL: `https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png` })
            .setColor(`#2c1178`)
            .setTitle(`Help`)
            .setDescription(`Here are all the commands you can use! See /help [command] for more info!`)
            .setFooter({ text: `SplitStat | Need help? thatalex.dev/splitstat` });
            var commands = fs.readdirSync('./commands');
            for(var i = 0; i < commands.length; i++) {
                var command = require(`./${commands[i]}`);
                if(!command.info) continue;
                helpEmbed.addField(`${command.info.name}`, `/help ${command.info.name}`, true);
            }
            return await interaction.reply({ embeds: [helpEmbed] });
        }

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