var chalk = require('chalk');
var fetch = require('node-fetch');
var { startembed, botuser } = require('../configd.json')

async function startTasks() {
    var post = await fetch(`${botuser.error_url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(startembed)
    });
}

module.exports = { startTasks } 