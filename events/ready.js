const chalk = require('chalk');
const discord = require('discord.js');
const config = require('../configd.json');
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        console.log(`-----------`)
        console.log(chalk.greenBright.bold(`Splitstat has started!\nLogged in as ${client.user.tag}.\nCurrently in ${client.guilds.cache.size} guilds.`))
        console.log(`-----------`)
    
        client.user.setActivity("/help", { type: 'PLAYING' });

        const startEmbed = new discord.MessageEmbed()
        .setTitle(`SplitStat has started!`)
        .setDescription(`Logged in as **${client.user.tag}.**\nI'm currently in **${client.guilds.cache.size} guilds!**\nEnvironment: **${config.env}**`)
        
        const webhookClient = new discord.WebhookClient({ id: config.botuser.webhookId, token: config.botuser.webhookToken })

                webhookClient.send({
                        username: `SplitStat - Starting!`,
                        avatarURL: 'https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png',
                        embeds: [startEmbed]
                })
	},
};