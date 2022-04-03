const Discord = require('discord.js');
const wh = require('../modules/webhook');

const errorEmbed = new Discord.MessageEmbed()
.setAuthor({ name: `SplitStat Bot`, iconURL: `https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png` })
.setColor(`#2c1178`)
.setTitle(`SplitStat Error!`)

async function genericHttpError(interaction, err) {

    errorEmbed.addFields(
        {
            name: 'Guild',
            value: `${interaction.member.guild.name}`,
            inline: true
        },
        {
            name: `User`, 
            value: `${interaction.user.tag}`, 
            inline: true
        },
        {
            name: 'Command',
            value: `${interaction.commandName}`,
            inline: true
        },
        {
            name: 'Error',
            value: `${err.message}`,
            inline: true
        }
    )

    errorEmbed.setDescription(`SplitStat encountered an error at <t:${Math.round(Date.now() / 1000)}:f>.\n\n**Stack Trace:** ${err.stack}`)

    await interaction.reply(`**Sorry, it appears something went wrong!** Please contact the developer via an issue on https://github.com/awexthedev/splitstat/issues.`);
    return wh({
        username: 'SplitStat - Errors',
        avatarURL: 'https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png',
        embeds: errorEmbed
    });
}

module.exports = { genericHttpError };