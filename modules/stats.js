// SplitStat Fetching Module
// This module handles the heavy lifting - sorting & fetching content from Tracker.gg and Steam.
// Things tend to go brokey here. Modify at your own risk.

const logger = require('./logger');
const axios = require('axios');
const config = require('../config.json');

async function fetch_match(matchId, platform, user) {
    if(platform === 'steam') var id = await steamUser(user);

    if(matchId) {
        var data = await axios.get(`https://public-api.tracker.gg/v1/splitgate/matches/${platform}/direct/${matchId}`, {
            headers: { 'TRN-Api-Key': `${config.apis.trn}` }
        })
        .catch(function(error) {
            console.log(error)
        })
    } else {
        var data = await axios.get(`https://public-api.tracker.gg/v2/splitgate/standard/matches/${platform}/${id}`, {
            headers: { 'TRN-Api-Key': `${config.apis.trn}` }
        })
        .catch(function(error) {
            console.log(error.toJSON())
        })
    }

    return {
        id,
        trn: data.data.data
    };
}

async function fetch_stats(platform, user) {
    if(platform === 'steam') var id = await steamUser(user);
    else var id = user;

    var data = await axios.get(`https://public-api.tracker.gg/v2/splitgate/standard/profile/${platform}/${id}`, {
        headers: { 'TRN-Api-Key': `${config.apis.trn}` }
    })
    .catch(function(error) {
        // console.log(error)
        return false;
    })

    return {
        id,
        avatar: data.data.data.platformInfo.avatarUrl,
        trn: data.data.data
    };
}

module.exports = {
    fetch_match,
    fetch_stats
}

async function steamUser(user) {
    if (user.includes('/id/')) {
        const response = await axios.get(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${config.apis.steam}&vanityurl=${user.split("/")[2]}`)
        .catch(async function(error) {
            // console.log(error.status)
        })
        var steam_id = response.data.response.steamid
    } else steam_id = user.split("/")[4];

    return steam_id;
}