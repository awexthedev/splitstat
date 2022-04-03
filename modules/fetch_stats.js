const axios = require('axios');
const steam = require('./steam');
const config = require('../config.json');
module.exports = async (platform, user) => {
    if(platform === 'steam') {
        var obj = await steam(user)
        var id = obj.id;
    } else var part = user;

    var data = await axios.get(`https://public-api.tracker.gg/v2/splitgate/standard/profile/${platform}/${part || id}`, {
        headers: { 'TRN-Api-Key': `${config.apis.trn}` }
    })
    .catch(function(error) {
        console.log(error.data)
        return false;
    })

    return {
        id,
        username: part,
        avatar: data.data.data.platformInfo.avatarUrl,
        trn: data.data.data
    };
}