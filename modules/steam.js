const axios = require("axios");
const config = require('../config.json');

module.exports = async (id) => {
    if(id.startsWith(`https`) || id.startsWith(`http`)) {
        var steam_id = id.split("/")[4];
        if(id.includes(`steamcommunity.com/id/`)) {
            const response = await axios.get(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${config.apis.steam}&vanityurl=${steam_id}`)
            var steam_id = response.data.response.steamid
        }
    }

    return steam_id;
}