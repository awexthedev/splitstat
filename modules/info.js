const config = require('../configd.json');
const fetch = require('node-fetch');

async function getSteamInfo(id) {
    var { response } = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${config.botuser.steam_api}&steamids=${id}`)
    .then(response => response.json());

    module.exports.steaminfo = response
}

async function resolveVanity(id) {
    const { response } = await fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${config.botuser.steam_api}&vanityurl=${id}`).then(response => response.json());

    module.exports.steamid = response.steamid
}

module.exports = { getSteamInfo, resolveVanity }