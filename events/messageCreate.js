const { MessageEmbed } = require('discord.js');
const chalk = require('chalk');
const fs = require('fs');
const wh = require('../modules/webhook');
module.exports = {
    name: `messageCreate`,
    on: true,
    async execute(msg) {
        prefix = `spl!`
        var client = msg.client;

        if(msg.content.includes(`<@!${client.user.id}>`)) {
            const mentionEmbed = new MessageEmbed()
            .setAuthor({ name: `SplitStat Bot`, iconURL: `https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png` })
            .setColor(`#2c1178`)
            .setTitle(`Hi!`)
            .setDescription(`Hello! I am SplitStat, an easy way to track your Splitgate player stats and performance!\nTo get started, see **/help** or **spl!help** for command options!`)
            .setTimestamp()
            .setFooter({ text: `SplitStat | Need help? awexxx.xyz/splitstat/discord` })

            return await msg.reply({ embeds: [mentionEmbed] });
        } else if(!msg.content.startsWith(prefix) || msg.author.bot) return;

        const args = msg.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        // Sift through available commands
        const availableCommands = [];
        const cmdlist = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        for (const file of cmdlist) {
            const cmd = require(`../commands/${file}`);
            availableCommands.push(cmd.name);
        }

        // Adds them to the client
        if (availableCommands.includes(command)) {
            msg.client.commands.get(command).execute(msg, args).catch(function(err) {
                console.log(`Error thrown in messageCreate event! Command is ${command}\n`, chalk.redBright.bold(err));
                console.log(err)

                // Error Embed
                const errorEmbed = new MessageEmbed()
                .setAuthor({ name: `SplitStat Bot`, iconURL: `https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png` })
                .setColor(`#b3000c`)
                .setTitle(`Uh oh!`)
                .setDescription(`Something went wrong when running **${command}**! This has been reported to Awex!`)
                .setTimestamp()
                .setFooter({ text: `SplitStat | Need help? awexxx.xyz/splitstat/discord` })
        
                return msg.reply({ embeds: [errorEmbed] });
            })
        } else {
            // Sends an embed when it's not found
            const notFound = new MessageEmbed()
            .setAuthor({ name: `SplitStat Bot`, iconURL: `https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png` })
            .setColor(`#b3000c`)
            .setTitle(`Uh oh!`)
            .setDescription(`That command wasn't found. Maybe a misspell?`)
            .setTimestamp()
            .setFooter({ text: `SplitStat | Need help? awexxx.xyz/splitstat/discord` })
            return msg.reply({ embeds: [notFound] });
        }
    }
}