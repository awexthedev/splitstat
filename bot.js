const Discord = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');
const process = require('process');
const config = require('./configd.json');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Discord.Collection();

// Command Handling
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// Event Handling
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Webhook Init
const webhookClient = new Discord.WebhookClient({ id: config.botuser.webhookId, token: config.botuser.webhookToken })

client.on('messageCreate', async msg => {
    prefix = `spl!`
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;
     return msg.reply(`Hey there, ${msg.author}!\nSplitstat has retired message commands completely as of **September 18th, 2021**. You must now use **slash commands**.\nRun **/help** for **Splitstat** to get started!`)
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		await interaction.reply({ content: 'There was an error while executing this command! This has been sent to Awex!\n**Error:** ' + '`' + error.message + '`' });

		var time = Date.now();
		
		const errorEmbed = new Discord.MessageEmbed()
		.setTitle(`SplitStat Error!`)
		.setDescription(`SplitStat encountered an error at <t:${Math.round(time / 1000)}:f>.\n\n**Error Type: ${error.name}**\n**Full Error: ${error.message}**`)

		webhookClient.send({
			username: 'SplitStat - Errors',
			avatarURL: 'https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png',
			embeds: [errorEmbed]
		});
	}
});

if(config.env === 'dev') {
    client.login(config.botuser.dev_token);
} else if (config.env === 'prod') {
    client.login(config.botuser.token);
}

// Exit handling
process.on('SIGINT', async () => {
	console.log(chalk.redBright.bold(`Recieved shutdown command (SIGINT)! Powering down..`))

	if(config.env === `prod`) {
		const exitEmbed = new Discord.MessageEmbed()
		.setTitle(`SplitStat - Shutting Down!`)
		.setDescription(`SplitStat shut down at **<t:${Math.round(Date.now() / 1000)}:f>**!\nClient was **${client.user.tag}**.`)
	
		await webhookClient.send({
			username: 'SplitStat - Powering Down',
			content: '<@288101780074528768>',
			avatarURL: 'https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png',
			embeds: [exitEmbed]
		});
	}

	process.exit();
})

process.on('uncaughtException', async (error) => {
	console.log(chalk.redBright.bold(`Uncaught Exception Detected!\n${error}`))

	const uncaughtEmbed = new Discord.MessageEmbed()
	.setTitle(`SplitStat - Uncaught Exception`)
	.setDescription(`SplitStat encountered an uncaught exception at **<t:${Math.round(Date.now() / 1000)}:f>**!\n**Error: ${error}**`)

	webhookClient.send({
		username: 'SplitStat - Uncaught Exception',
		content: '<@288101780074528768>',
		avatarURL: 'https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png',
		embeds: [uncaughtEmbed]
	})
})