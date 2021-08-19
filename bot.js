const discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const fetch = require('node-fetch')
const fs = require('fs');
const config = require('./config.json')
require('dotenv').config();

const prefix = 'spl!';
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const token = process.env.DISCORD_TOKEN

client.commands = new discord.Collection();
const commands = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commands) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', async () => {
    console.log(`SplitStat is up and running! Logged in as ${client.user.tag}.`)
    client.user.setActivity(`spl!help`)
})

client.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping') {
        client.commands.get('ping').execute(client, discord, message, args)
    } else if (command === 'help') {
        client.commands.get('help').execute(client, discord, message, args)
    } else if (command === 'stat') {
        client.commands.get('stat').execute(client, discord, message, args, fetch)
    } else if (command === 'idhelp') {
        client.commands.get('idhelp').execute(client, discord, message, args)
    } else if (command === 'cat') {
        client.commands.get('cat').execute(client, discord, message, args)
    }
})

client.login(token)