const chalk = require('chalk');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        console.log(`-----------`)
        console.log(chalk.greenBright.bold(`Splitstat has started!\nLogged in as ${client.user.tag}.\nCurrently in ${client.guilds.cache.size} guilds.`))
        console.log(`-----------`)
    
        client.user.setActivity("/help", { type: 'PLAYING' });
	},
};