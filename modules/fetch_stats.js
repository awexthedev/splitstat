const axios = require('axios');
const steam = require('./steam');
const config = require('../config.json');
module.exports = async (platform, user) => {

    if(platform === 'steam') var id = await steam(user);
    else var id = user;

    var data = await axios.get(`https://public-api.tracker.gg/v2/splitgate/standard/profile/${platform}/${id}`, {
        headers: { 'TRN-Api-Key': `${config.apis.trn}` }
    })
    .catch(function(error) {
        return false;
    })

    return {
        id,
        avatar: data.data.data.platformInfo.avatarUrl,
        trn: data.data.data
    };
}