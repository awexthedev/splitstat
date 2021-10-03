var config = require('../configd.json');
var axios = require('axios').default;
var nodeCache = require('node-cache');

var cache = new nodeCache({ stdTTL: 30*60000 });

async function fetchTrnApi(user, platform, discordId) {
    // Steam URL
    if(platform === `steam`) {
        if(user.startsWith(`https`) || user.startsWith(`http`)) {
            var part = user.split("/")[4];
            if(user.includes(`steamcommunity.com/id/`)) {
                const response = await axios.get(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${config.botuser.steam_api}&vanityurl=${part}`)
                var part = response.data.response.steamid
            }
        } else return module.exports.errmsg = `Need to provide a URL for Steam user!`
    } else var part = user;

    const data = await axios.get(`https://public-api.tracker.gg/v2/splitgate/standard/profile/${platform}/${part}`, {
        method: 'GET',
        headers: { 'TRN-Api-Key': `${config.botuser.trn_api}` }
    })

    // Error Checking
    if(data.errors) {
        if(data.errors[0].code === "CollectorResultStatus::NotFound") return module.exports.errmsg = `User ${user} doesn't exist in Tracker Network's ${platform} API`;
    } else {
        // yes this is a lot of data please end my suffering
        var dataObject = {
            "profileObject": {
                "platformInfo": {
                    "platformUserHandle": data.data.data.platformInfo.platformUserHandle
                },
                "userInfo": {
                    "countryCode": data.data.data.userInfo.countryCode,
                    "userId": data.data.data.userInfo.userId,
                    "isPartner": data.data.data.userInfo.isPartner,
                    "isVerified": data.data.data.userInfo.isVerified,
                    "isInfluencer": data.data.data.userInfo.isInfluencer,
                    "isPremium": data.data.data.userInfo.isPremium
                }
            }
        }

        if(cache.get(`${user}`) === undefined) {
            await cache.set(`${user}`, dataObject)
            module.exports.trn = data.data.data.segments[0].stats
            module.exports.allObjects = data.data.data
        } else {
            var cacheData = cache.get(`${user}`)
            module.exports.trn = data.data.data.segments[0].stats
            module.exports.allObjects = cacheData.profileObject
        }
    }
}

module.exports = { fetchTrnApi }