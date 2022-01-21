const axios = require('axios');
const steam = require('./steam');
const config = require('../config.json');
module.exports = async (platform, user) => {
    if(platform === 'steam') {
        var obj = await steam(user)
        var part = obj.id;
    } else if (platform !== 'steam') {
        obj = {
            username: user,
            avatar: null
        }

        var part = user;
    }

    var data = await axios.get(`https://public-api.tracker.gg/v2/splitgate/standard/profile/${platform}/${part}`, {
        headers: { 'TRN-Api-Key': `${config.apis.trn}` }
    })
    .catch(function(error) {
        console.log(error)
        return false;
    })

    return {
        username: obj.username,
        avatar: obj.avatar,
        trn: data.data.data
    };
}