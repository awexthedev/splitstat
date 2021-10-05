var config = require('../configd.json');
var axios = require('axios').default;

async function fetchTrnApi(user, platform) {
    if(platform === `steam`) {
        if(user.startsWith(`https`) || user.startsWith(`http`)) {
            var part = user.split("/")[4];
            if(user.includes(`steamcommunity.com/id/`)) {
                const response = await axios.get(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${config.botuser.steam_api}&vanityurl=${part}`)
                var part = response.data.response.steamid
            }
        } else return module.exports.errmsg = `Need to provide a URL for Steam user!`
    } else var part = user;

    try {
        var data = await axios.get(`https://public-api.tracker.gg/v2/splitgate/standard/profile/${platform}/${part}`, {
            method: 'GET',
            headers: { 'TRN-Api-Key': `${config.botuser.trn_api}` }
        }) 
    } catch (error) {
        return module.exports.errmsg = `User ${user} doesn't exist in Tracker Network's ${platform} API`
    }

    module.exports.allObjects = data.data.data
    module.exports.trn = data.data.data.segments[0].stats
}

// fetchTrnApi(`test`, `xbl`)

module.exports = { fetchTrnApi }