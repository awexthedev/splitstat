const axios = require('axios');
const config = require('../config.json');
const steam = require('./steam');
module.exports = async (platform, user) => {
    if(platform === 'steam') {
        var obj = await steam(user)
        var id = obj.id;
    } else if (platform !== 'steam') {
        obj = {
            username: user,
            avatar: null
        }

        var part = user;
    }

    var data = await axios.get(`https://public-api.tracker.gg/v2/splitgate/standard/search?platform=${platform}&query=${id || part}`, {
        headers: { 'TRN-Api-Key': `${config.apis.trn}` }
    })
    .catch(function(error) {
        console.log(error)
        return false;
    })

    return {
        id,
        username: obj.username,
        avatar: obj.avatar,
        trn: data.data.data
    };
}