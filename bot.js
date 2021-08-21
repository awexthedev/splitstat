const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const Sequelize = require('sequelize');
const fs = require('fs');
const fetch = require('node-fetch');
const { botuser, startembed, stopembed } = require('./config.json');
require('dotenv').config();

var prefix = botuser.prefix;
var token = process.env.DISCORD_TOKEN
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: true,
	// SQLite only
	storage: 'database.sqlite',
});

const Tags = sequelize.define('tags', {
	sid: {
		type: Sequelize.STRING,
		unique: true,
	},
	username: Sequelize.INTEGER,
    vanity: Sequelize.STRING,
});

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
    console.log(`SplitStat (PRODUCTION) has logged in!\nLogged in as ${bot.user.tag}.`)
    bot.user.setActivity(`spl!help`)

    var datetime = new Date();
    var numOfGuilds = bot.guilds.cache.size
    startembed.embeds[0].description = `SplitStat has started **successfully** at **${datetime}**.\n\nLogged in as **${bot.user.tag}**.\nI'm in ${numOfGuilds} guilds!`;

    var post = await fetch(`${process.env.error_webhook_url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(startembed)
    })

    Tags.sync();
});

bot.on('messageCreate', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping') {
        bot.commands.get('ping').execute(bot, message);
    } else if (command === 'lookup') {
        bot.commands.get('lookup').execute(bot, message, args, MessageEmbed, Tags);
    } else if (command === 'cat') {
        bot.commands.get('cat').execute(bot, message, MessageEmbed);
    } else if (command === 'stathelp') {
        bot.commands.get('stathelp').execute(bot, message, MessageEmbed);
    } else if (command === 'help') {
        bot.commands.get('help').execute(bot, message, MessageEmbed);
    } else if (command === 'profile') {
        bot.commands.get('profile').execute(bot, message, args, MessageEmbed, Tags);
    } else if (command === 'complain') {
        bot.commands.get('complain').execute(bot, message, args, MessageEmbed);
    } else if (command === 'changelog') {
        bot.commands.get('changelog').execute(message, MessageEmbed);
    } else if (command === 'info') {
        bot.commands.get('info').execute(message, MessageEmbed);
    } else if (command === 'link') {
        bot.commands.get('link').execute(message, args, MessageEmbed, Tags, Sequelize);
    } else if (command === 'unlink') {
        bot.commands.get('unlink').execute(message, args, MessageEmbed, Tags, Sequelize);
    } else if (command === 'forceunlink' && message.author.id === `288101780074528768`) {
        bot.administration.get('forceunlink').execute(message, args, Tags)
    } else if (command === 'whois' && message.author.id === `288101780074528768`) {
        bot.administration.get('whois').execute(bot, message, args, MessageEmbed, Tags);
    }
})

bot.login(token)