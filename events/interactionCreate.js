const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
    name: `interactionCreate`,
    on: true,
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            await interaction.reply({ content: 'There was an error while executing this command! This has been sent to Awex!\n**Error:** ' + '`' + error.message + '`' });

            var time = Date.now();
            
            const errorEmbed = new Discord.MessageEmbed()
            .setTitle(`SplitStat Error!`)
            .setDescription(`SplitStat encountered an error at <t:${Math.round(time / 1000)}:f>.\n\n**Error Type: ${error.name}**\n**Full Error: ${error.message}**`)

            webhookClient.send({
                username: 'SplitStat - Errors',
                avatarURL: 'https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png',
                embeds: [errorEmbed]
            });
        }
    }
}