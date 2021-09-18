const Discord = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');
const config = require('./configd.json');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
    console.log(`-----------`)
    console.log(chalk.greenBright.bold(`Splitstat has started!\nLogged in as ${client.user.tag}.\nCurrently in ${client.guilds.cache.size} guilds.`))
    console.log(`-----------`)
});

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
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command! This has been sent to Awex!\n**Error:** ' + '`' + error.message + '`' });

		var time = Date.now();

		const webhookClient = new Discord.WebhookClient({ id: config.botuser.webhookId, token: config.botuser.webhookToken })
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