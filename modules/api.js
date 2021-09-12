var config = require('../configd.json');
var chalk = require('chalk');
var fetch = require('node-fetch')
error = false;
global = {}

async function fetchTrnApi(user, platform, args) {

    if(!user || !platform) {
        error = true;
        module.exports.error = error
        return console.log(chalk.redBright.bold(`No user or platform were provided.`))
    }

    // Platform correction - Xbox = xbl, playstation = psn
    if(platform === 'xbox') {
        global.platform = 'xbl'
        part = user
    } else if (platform === 'playstation') {
        global.platform = 'psn'
        part = user
    } else if (platform === 'steam') {
        global.platform = 'steam'
        if (args[1].startsWith(`https`) || args[1].startsWith(`http`)) {
            var currentURL = args[1]
            var part = currentURL.split("/")[4];
            if(args[1].includes(`steamcommunity.com/id/`)) {
                const { response } = await fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${config.botuser.steam_api}&vanityurl=${part}`).then(response => response.json());
                var part = response.steamid
            }
        } else if (platform === 'steam' && !args[1].startsWith(`https`) || !args[1].startsWith(`http`)) {
            console.log(`Doesn't contain https or http`)
            module.exports.error = error
            return module.exports.errmsg = `Need to provide a URL for Steam user!`
        }
    }

    try {
    const data = await fetch(`https://public-api.tracker.gg/v2/splitgate/standard/profile/${global.platform}/${part}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'TRN-Api-Key': `${config.botuser.trn_api}` }
    }).then(response => response.json())

    if(data.errors) {
        if(data.errors[0].code === "CollectorResultStatus::NotFound") {
            error = true
            module.exports.error = error
            module.exports.errmsg = `User ${user} doesn't exist in Tracker Network's ${platform} API`
            return console.log(chalk.redBright.bold(`User ${user} doesn't exist in Tracker Network's ${platform} API`))
        } else if (data.errors[0].code === null) {
            if(data.errors[0].message === `The specified platform is invalid.`) {
                error = true
                module.exports.error = error
                module.exports.errmsg = `Platform is invalid`
                console.log(`Platform is invalid`)
            }
        }
    }

    module.exports.trn = data.data.segments[0].stats
    module.exports.profile = data.data
    }
    catch (err) {
    error = true;
    module.exports.error = error
    module.exports.errmsg = err.message
    console.log(chalk.redBright.bold(`An error occurred while trying to fetch ${user}'s stats via the API!\n`), err)
    }
}

module.exports = { fetchTrnApi }