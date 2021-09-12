const { MessageEmbed, Collection, Intents, Client } = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');
const config = require('./configd.json');

// var prefix = config.botuser.prefix

if (config.env === `prod`) {
    var prefix = config.botuser.prefix 
} else if (config.env === `dev`) {
    var prefix = config.botuser.devprefix
}

var token = config.botuser.token;
var devtoken = config.botuser.token;
var post = require('./modules/post.js');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

bot.commands = new Collection();
const commands = fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'));
for(const file of commands) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command)
}

bot.once('ready', async () => {
    console.log(`-------\nSplitStat (${config.env}) has logged in!\nLogged in as ${bot.user.tag}.`);
    bot.user.setActivity(`${prefix}help`);

    var datetime = new Date();
    config.startembed.embeds[0].description = `SplitStat has started **successfully** at **${datetime}**.\n\nLogged in as **${bot.user.tag}** on **${config.env}**.`;
    await post.startTasks()
})

bot.on('messageCreate', async message => {
    if(!message.content.startsWith(prefix.toLowerCase()) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping') {
        bot.commands.get('ping').execute(bot, message)
    } else if (command === 'profile') {
        bot.commands.get('profile').execute(message, args, MessageEmbed);
    } else if (command === 'lookup') {
        bot.commands.get('lookup').execute(message, args, MessageEmbed);
    } else if (command === 'help') {
        bot.commands.get('help').execute(message, MessageEmbed);
    } else if (command === 'cat') {
        bot.commands.get('cat').execute(message, MessageEmbed)
    } else if (command === 'info') {
        bot.commands.get('info').execute(message, MessageEmbed)
    } else if (command === 'changelog') {
        bot.commands.get('changelog').execute(message, MessageEmbed)
    } else if (command === 'complain') {
        bot.commands.get('complain').execute(message, args, MessageEmbed)
    }
})

if (config.env === `prod`) {
    bot.login(token)
} else if (config.env === `dev`) {
    bot.login(devtoken)
}