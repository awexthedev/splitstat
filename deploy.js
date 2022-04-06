const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const chalk = require('chalk');
const config = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(__dirname + `/commands/${file}`);
	commands.push(command.data.toJSON());
}

if (config.env == "prod") {
    var token = config.tokens.prod;
	var clientId = config.client.prod.client;

    const rest = new REST({ version: '9' }).setToken(token);

    (async () => {
        try {
            await rest.put(
                Routes.applicationCommands(clientId),
                { body: commands },
            );
    
            console.log(chalk.greenBright.bold('Successfully registered global application commands.'));
        } catch (error) {
            console.error(error);
        }
    })();
} else if (config.env == "dev") {
    var token = config.tokens.dev;
    var clientId = config.client.dev.client;
    var guildId = config.client.dev.guild;

    const rest = new REST({ version: '9' }).setToken(token);
    
    (async () => {
        try {
            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );
    
            console.log(chalk.greenBright.bold('Successfully registered application commands.'));
            process.exit(0);
        } catch (error) {
            console.error(error);
        }
    })();
} else console.log(chalk.redBright.bold(config.env + " is not a valid environment."));