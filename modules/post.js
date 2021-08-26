var chalk = require('chalk');
var fetch = require('node-fetch');
var { startembed, botuser } = require('../configd.json')
let apiOnline = true;

async function startTasks() {
    var post = await fetch(`${botuser.error_url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(startembed)
    });

    var heartbeat = await fetch(`http://localhost:3000/heartbeat`).then(response => response.json()).catch(err => {
        console.log(chalk.redBright.bold(`Heartbeat failed! Disabling all commands.`));
        return apiOnline = false;
    })
        console.log(chalk.greenBright.bold(`Heartbeat succeeded! Continuing..`))
        module.exports.apiOnline = apiOnline
}

module.exports = { startTasks } 