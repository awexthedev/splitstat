const chalk = require('chalk');
const discord = require('discord.js');
const config = require('../configd.json');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
                const webhookClient = new discord.WebhookClient({ id: config.botuser.webhooks.power.webhookId, token: config.botuser.webhooks.power.webhookToken })

                if (config.maintenance === true) {
                    client.user.setPresence({
                            activities: [{
                                    name: 'in Maintenance Mode!'
                            }],
                            status: 'idle'
                    })    

                    console.log(`-----------`)
                    console.log(chalk.greenBright.bold(`Splitstat has started!\nLogged in as ${client.user.tag}.\n`) + chalk.redBright.bold(`STARTED IN MAINTENANCE MODE.`))
                    console.log(`-----------`)

                    const startEmbed = new discord.MessageEmbed()
                    .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                    .setColor(`#2c1178`)
                    .setTitle(`SplitStat has started!`)
                    .setDescription(`Logged in as **${client.user.tag}.**\nI'm currently in **${client.guilds.cache.size} guilds!**\nEnvironment: **MAINTENANCE MODE**`)
                    
                            return webhookClient.send({
                                    username: `SplitStat - MAINTENANCE`,
                                    avatarURL: 'https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png',
                                    embeds: [startEmbed]
                            })
                }


        console.log(`-----------`)
        console.log(chalk.greenBright.bold(`Splitstat has started!\nLogged in as ${client.user.tag}.\nCurrently in ${client.guilds.cache.size} guilds.`))
        console.log(`-----------`)
    
        client.user.setActivity("/help", { type: 'PLAYING' });

        const startEmbed = new discord.MessageEmbed()
        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
        .setColor(`#2c1178`)
        .setTitle(`SplitStat has started!`)
        .setDescription(`Logged in as **${client.user.tag}.**\nI'm currently in **${client.guilds.cache.size} guilds!**\nEnvironment: **${config.env}**`)
        
                webhookClient.send({
                        username: `SplitStat - Starting!`,
                        avatarURL: 'https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png',
                        embeds: [startEmbed]
                })
	},
};