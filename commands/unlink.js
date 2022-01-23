const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');
const link = require('../modules/linking/link_user');
module.exports = {
    name: 'unlink',
    data: new SlashCommandBuilder()
            .setName(`unlink`)
            .setDescription(`Unlink your Tracker account!`),
    info: {
        "name": 'Unlink',
        "description": "Unlink your Splitgate account in SplitStat.",
        "image": null,
        "usage": "unlink",
        "requireArgs": false
    },
    async execute(interaction, author) {
        var data = await link.unlink(author.id);

        if(data === false) {
            return await interaction.reply(`Sorry, it doesn't seem like you've linked an account!\nIf you want this checked manually, please join the SplitStat Discord Server.`)
        } else {
            return await interaction.reply(`**Sorry to see you go :(**\nYour account has now been unlinked and removed from SplitStat.`)
        }
    }
}