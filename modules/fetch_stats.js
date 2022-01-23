const axios = require('axios');
const steam = require('./steam');
const config = require('../config.json');
module.exports = async (platform, user, linked) => {
    if(platform === 'steam' && linked === false) {
        var obj = await steam(user)
        var part = obj.id;
    } else var part = user;

    var data = await axios.get(`https://public-api.tracker.gg/v2/splitgate/standard/profile/${platform}/${part}`, {
        headers: { 'TRN-Api-Key': `${config.apis.trn}` }
    })
    .catch(function(error) {
        console.log(error.data)
        return false;
    })


    return {
        username: data.data.data.platformInfo.platformUserHandle,
        avatar: data.data.data.platformInfo.avatarUrl,
        trn: data.data.data
    };
}