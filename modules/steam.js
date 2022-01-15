const axios = require("axios");
const config = require('../config.json');

module.exports = async (id) => {
    if(id.startsWith(`https`) || id.startsWith(`http`)) {
        var cutId = id.split("/")[4];
        if(id.includes(`steamcommunity.com/id/`)) {
            const response = await axios.get(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${config.apis.steam}&vanityurl=${cutId}`)
            var steam_id = response.data.response.steamid
        }
    }

    var profile = await axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${config.apis.steam}&steamids=${steam_id}`)

    return {
        "id": profile.data.response.players[0].steamid,
        "username": profile.data.response.players[0].personaname,
        "avatar": profile.data.response.players[0].avatarfull
    };

    // return 
}