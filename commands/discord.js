const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    name: 'discord',
    data: new SlashCommandBuilder()
    .setName(`discord`)
    .setDescription(`Get support for this bot!`),
    info: {
        "name": "discord",
        "description": "Get support for this bot!",
        "image": null,
        "usage": "/discord",
    },
    async execute(interaction) {
        return await interaction.reply(`Hey **${interaction.user.tag}**!\nYou can join the Discord Support Server for SplitStat here: https://dsc.gg/splitstat`)
    }
}