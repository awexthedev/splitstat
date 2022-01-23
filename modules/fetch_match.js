const config = require('../config.json');
const steam = require('./steam');
const axios = require('axios');
module.exports = async (matchId, platform, user, linked) => {    
    if(platform === 'steam' && linked === false) {
        obj = await steam(user)
        var part = obj.id;
    } else {
        var part = user
        obj = {
            "username": user
        }
    }

    if(matchId) {
        var data = await axios.get(`https://public-api.tracker.gg/v1/splitgate/matches/${platform}/direct/${matchId}`, {
            headers: { 'TRN-Api-Key': `${config.apis.trn}` }
        })
        .catch(function(error) {
            console.log(error)
        })
    } else {
        var data = await axios.get(`https://public-api.tracker.gg/v2/splitgate/standard/matches/${platform}/${part}`, {
            headers: { 'TRN-Api-Key': `${config.apis.trn}` }
        })
        .catch(function(error) {
            console.log(error.toJSON())
        })
    }

    return {
        username: obj.username,
        avatar: null,
        trn: data.data.data
    };
}