const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    name: 'ping',
    data: new SlashCommandBuilder()
    .setName(`ping`)
    .setDescription(`See the bots ping!`),
    info: {
        "name": 'Ping',
        "description": "Get the ping of the bot!",
        "image": null,
        "usage": "/ping"
    },
    async execute(interaction) {
        return await interaction.reply('Bot ping: ' + '`' + `${Date.now() - interaction.createdTimestamp}` + 'ms`')
    }
}