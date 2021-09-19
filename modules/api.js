var config = require('../configd.json');
var chalk = require('chalk');
var fetch = require('node-fetch')

async function fetchTrnApi(user, platform, int) {
    // Steam URL
    if(platform === `steam`) {
        if(user.startsWith(`https`) || user.startsWith(`http`)) {
            var part = user.split("/")[4];
            if(user.includes(`steamcommunity.com/id/`)) {
                const { response } = await fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${config.botuser.steam_api}&vanityurl=${part}`).then(response => response.json());
                var part = response.steamid
            }
        } else {
            module.exports.error = error
            return module.exports.errmsg = `Need to provide a URL for Steam user!`
        }
    } else {
        var part = user;
    }

    const data = await fetch(`https://public-api.tracker.gg/v2/splitgate/standard/profile/${platform}/${part}`, {
        method: 'GET',
        headers: { 'TRN-Api-Key': `${config.botuser.trn_api}` }
    }).then(response => response.json());

    // Error Checking
    if(data.errors) {
        if(data.errors[0].code === "CollectorResultStatus::NotFound") return module.exports.errmsg = `User ${user} doesn't exist in Tracker Network's ${platform} API`;
    }

    // Export vars
    module.exports.trn = data.data.segments[0].stats
    module.exports.profile = data.data
}

module.exports = { fetchTrnApi }