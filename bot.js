const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');
const { botuser, startembed, stopembed } = require('./config.json');
const chalk = require('chalk');
const api = require(`./api/ent`)
require('dotenv').config();

var prefix = botuser.prefix;
var token = process.env.DISCORD_TOKEN
var apiOnline = true;
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Command Handler
bot.commands = new Collection();
const commands = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commands) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command)
}

bot.administration = new Collection();
const administration = fs.readdirSync('./commands/admin/').filter(file => file.endsWith('.js'));
for(const file of administration) {
    const command = require(`./commands/admin/${file}`);

    bot.administration.set(command.name, command);
}

bot.once('ready', async () => {
    console.log(`-------\nSplitStat (PRODUCTION) has logged in!\nLogged in as ${bot.user.tag}.`)
    bot.user.setActivity(`spl!help`)

    var datetime = new Date();
    var numOfGuilds = bot.guilds.cache.size
    startembed.embeds[0].description = `SplitStat has started **successfully** at **${datetime}**.\n\nLogged in as **${bot.user.tag}**.\nI'm in ${numOfGuilds} guilds!`;

    var post = await fetch(`${process.env.error_webhook_url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(startembed)
    })

    var heartbeat = await fetch(`http://localhost:3000/heartbeat`).then(response => response.json()).catch(err => {
        console.log(chalk.redBright.bold(`Heartbeat failed! Disabling all commands.`));
        return apiOnline = false;
    })

    if(apiOnline === false) {
        return;
    }
        console.log(chalk.greenBright.bold(`Heartbeat succeeded! Continuing..`))
});

bot.on('messageCreate', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(apiOnline === false) {
        return message.reply(`Sorry, but I failed to connect to the SplitStat API. All commands have been disabled.\nPlease check https://awexxx.xyz/splitstatbot/status for more info on status.`)
    }

    if(command === 'ping') {
        bot.commands.get('ping').execute(bot, message);
    } else if (command === 'lookup') {
        bot.commands.get('lookup').execute(message, args, MessageEmbed);
    } else if (command === 'cat') {
        bot.commands.get('cat').execute(bot, message, MessageEmbed);
    } else if (command === 'stathelp') {
        bot.commands.get('stathelp').execute(bot, message, MessageEmbed);
    } else if (command === 'help') {
        bot.commands.get('help').execute(bot, message, MessageEmbed);
    } else if (command === 'profile') {
        bot.commands.get('profile').execute(message, args, MessageEmbed);
    } else if (command === 'complain') {
        bot.commands.get('complain').execute(bot, message, args, MessageEmbed);
    } else if (command === 'changelog') {
        bot.commands.get('changelog').execute(message, MessageEmbed);
    } else if (command === 'info') {
        bot.commands.get('info').execute(message, MessageEmbed);
    } else if (command === 'link') {
        bot.commands.get('link').execute(message, args, MessageEmbed);
    } else if (command === 'unlink') {
        bot.commands.get('unlink').execute(message, args, MessageEmbed);
    } else if (command === 'forceunlink' && message.author.id === `288101780074528768`) {
        bot.administration.get('forceunlink').execute(message, args)
    } else if (command === 'whois' && message.author.id === `288101780074528768`) {
        bot.administration.get('whois').execute(message, args, MessageEmbed);
    }
})

bot.login(token)