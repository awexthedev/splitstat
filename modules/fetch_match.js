const config = require('../config.json');
const steam = require('./steam');
const axios = require('axios');
module.exports = async (matchId, platform, user) => {    
    if(platform === 'steam') var id = await steam(user);
    else var id = user;

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