const Discord = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');
const config = require('./configd.json');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

// Command Handling
client.commands = new Discord.Collection();
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

if(config.env === 'dev') {
    client.login(config.botuser.dev_token);
} else if (config.env === 'prod') {
    client.login(config.botuser.token);
}

// Exit handling
process.on('SIGINT', async () => {
	var webhookClient = new Discord.WebhookClient({ id: config.botuser.webhooks.classic.webhookId, token: config.botuser.webhooks.classic.webhookToken })
	console.log(chalk.redBright.bold(`Recieved shutdown command (SIGINT)! Powering down..`))

	if(config.env === `prod`) {
		const exitEmbed = new Discord.MessageEmbed()
		.setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
		.setColor(`#2c1178`)
		.setTitle(`SplitStat - Shutting Down!`)
		.setDescription(`SplitStat shut down at **<t:${Math.round(Date.now() / 1000)}:f>**!\nClient was **${client.user.tag}**.`)
	
		await webhookClient.send({
			username: 'SplitStat - Powering Down',
			content: '<@288101780074528768>',
			avatarURL: 'https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png',
			embeds: [exitEmbed]
		});
	} else {
		console.log(chalk.greenBright.bold(`In DEVELOPMENT mode, not firing webhook.`))
	}

	process.exit();
})

// Uncaught Exception Handler
process.on('uncaughtException', async (error) => {
	var webhookClient = new Discord.WebhookClient({ id: config.botuser.webhooks.classic.webhookId, token: config.botuser.webhooks.classic.webhookToken })
	console.log(chalk.redBright.bold(`Uncaught Exception Detected!\n${error}`))

	const uncaughtEmbed = new Discord.MessageEmbed()
	.setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
	.setColor(`#2c1178`)
	.setTitle(`SplitStat - Uncaught Exception`)
	.setDescription(`SplitStat encountered an uncaught exception at **<t:${Math.round(Date.now() / 1000)}:f>**!\n**${error}**`)
	if (config.env === `prod`) {
		await webhookClient.send({
			username: 'SplitStat - Uncaught Exception',
			content: '<@288101780074528768>',
			avatarURL: 'https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png',
			embeds: [uncaughtEmbed]
		})
	} else if (config.env === `dev`) {
		console.log(chalk.greenBright.bold(`In DEVELOPMENT mode, not firing webhook.`))
	}
})