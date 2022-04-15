const { Client } = require('guilded.js');
const config = require('./config.json');
const logger = require('./modules/logger');
const { readdirSync } = require('fs');
const client = new Client({ token: config.tokens.prod });

// client.commands = new Collection();
const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    if(config.debug) {
        logger.debug(file + " command loaded.")
    }
}

const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);

    if(config.debug) {
        logger.debug(file + " event loaded.")
    }

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login();