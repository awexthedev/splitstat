const axios = require('axios');
const steam = require('./steam');
const config = require('../config.json');
module.exports = async (user1, user2) => {
    // if(platform === 'steam' && linked === false) {
    //     var obj = await steam(user1)
    //     var part = obj.id;
    // } else var part = user;

    // var data = await axios.get(`https://public-api.tracker.gg/v2/splitgate/standard/profile/${platform}/${part}`, {
    //     headers: { 'TRN-Api-Key': `${config.apis.trn}` }
    // })
    // .catch(function(error) {
    //     console.log(error)
    //     return false;
    // })

    var ids = [];

    // Object.keys(users).forEach(function(key) {
    //     if(key.platform === 'steam') {
    //         var data = await steam(key.id)
    //     }
    // })

    var data1 = await axios.get(`https://public-api.tracker.gg/v2/splitgate/standard/profile/${user1.gameid}/${user1.id}`, {
        headers: { 'TRN-Api-Key': `${config.apis.trn}` }
    })
    .catch(function(error) {
        console.log(error)
        return false;
    })

    var data2 = await axios.get(`https://public-api.tracker.gg/v2/splitgate/standard/profile/${user2.gameid}/${user2.id}`, {
        headers: { 'TRN-Api-Key': `${config.apis.trn}` }
    })
    .catch(function(error) {
        console.log(error)
        return false;
    })


    return {
        user1: data1.data.data,
        user2: data2.data.data
    };
}