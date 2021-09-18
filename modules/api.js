var config = require('../configd.json');
var chalk = require('chalk');
var fetch = require('node-fetch')
error = false;
global = {}

async function fetchTrnApi(user, platform, interaction) {

    if (platform === 'steam') {
        if (user.startsWith(`https`) || user.startsWith(`http`)) {
            var part = user.split("/")[4];
            if(user.includes(`steamcommunity.com/id/`)) {
                const { response } = await fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${config.botuser.steam_api}&vanityurl=${part}`).then(response => response.json());
                var part = response.steamid
            }
        } else if (platform === 'steam' && !user.startsWith(`https`) || !user.startsWith(`http`)) {
            module.exports.error = error
            return module.exports.errmsg = `Need to provide a URL for Steam user!`
        }
    } else {
        var part = user;
    }

    try {
    const data = await fetch(`https://public-api.tracker.gg/v2/splitgate/standard/profile/${platform}/${part}`, {
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