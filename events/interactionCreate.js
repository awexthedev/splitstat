
const Discord = require('discord.js');
const wh = require('../modules/webhook');
const config = require('../config.json');

module.exports = {
    name: 'interactionCreate',
    on: true,
    async execute(interaction) {
        if(!interaction.isCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);

            try {
                var cmd = require(`../commands/${interaction.commandName}.js`)

                if(cmd.info.msgonly === true) return interaction.reply(`Sorry, this command is message-only. Please use **spl!${interaction.commandName}**.`)

                if(cmd.info.requireArgs === true) {
                    // Arguments
                    var args = [];
                    await Object.keys(interaction.options._hoistedOptions).forEach(function(key) {
                        args.push(interaction.options._hoistedOptions[key].value);
                    });

                    command.execute(interaction, args, interaction.user);
                } else command.execute(interaction, interaction.user);
            } catch (error) {
                console.log(error)
                await interaction.reply({ content: 'There was an error while executing this command! This has been sent to Awex!\n**Error:** ' + '`' + error.message + '`' });

                const errorEmbed = new Discord.MessageEmbed()
                .setAuthor({ name: `SplitStat Bot`, iconURL: `https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png` })
                .setColor(`#2c1178`)
                .setTitle(`SplitStat Error!`)
                .addFields(
                    { name: 'Guild', value: `${interaction.member.guild.name}`, inline: true },
                    { name: 'User', value: `${interaction.user.tag}`, inline: true },
                    { name: 'Command', value: `${command.name}`, inline: true }
                )
                .setDescription(`SplitStat encountered an error at <t:${Math.round(Date.now() / 1000)}:f>.\n\n**Error Type: ${error.name}**\n**Full Error: ${error.message}**`)

                return wh({
                    username: 'SplitStat - Errors',
                    avatarURL: 'https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png',
                    embeds: errorEmbed
                });
            }
    }
}