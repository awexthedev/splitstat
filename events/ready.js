const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
const wh = require('../modules/webhook');
const chalk = require('chalk');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.user.setActivity("/help", { type: 'PLAYING' });

        console.log(`-----------`)
        console.log(chalk.greenBright.bold(`Splitstat has started!\nLogged in as ${client.user.tag}.\nCurrently in ${client.guilds.cache.size} guilds.`))
        console.log(`-----------`)

        const startEmbed = new MessageEmbed()
        .setAuthor({ name: `SplitStat Bot`, iconURL: `https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png` })
        .setColor(`#2c1178`)
        .setTitle(`SplitStat has started!`)
        .setDescription(`Logged in as **${client.user.tag}.**\nI'm currently in **${client.guilds.cache.size} guilds!**\nEnvironment: **${config.env}**`)

        await wh({
            username: "SplitStat - Power",
            avatarURL: "https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png",
            embeds: startEmbed
        });
    }
}