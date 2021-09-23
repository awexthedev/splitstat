const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    name: 'ping',
    data: new SlashCommandBuilder()
    .setName(`ping`)
    .setDescription(`See the bots ping!`),
    deprecated: {
        'status': null,
        'date': null,
        'reason': null
    },
    async execute(interaction) {
        return await interaction.reply('Bot ping: ' + '`' + `${Date.now() - interaction.createdTimestamp}` + 'ms`')
    }
}