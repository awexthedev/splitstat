const axios = require('axios');
const config = require('../config.json');
const steam = require('./steam');
module.exports = async (platform, user) => {
    if(platform === 'steam') var id = await steam(user);
    else var id = user;

    var data = await axios.get(`https://public-api.tracker.gg/v2/splitgate/standard/search?platform=${platform}&query=${id}`, {
        headers: { 'TRN-Api-Key': `${config.apis.trn}` }
    })
    .catch(function(error) {
        console.log(error)
        return false;
    })

    return {
        id,
        username: data.data.data[0].platformUserHandle,
        avatar: data.data.data[0].avatarUrl,
        slug: data.data.data[0].platformSlug,
    };
}