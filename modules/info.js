const config = require('../configd.json');
const fetch = require('node-fetch');

async function getSteamInfo(id) {
    var { response } = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${config.botuser.steam_api}&steamids=${id}`)
    .then(response => response.json());

    module.exports.steaminfo = response
}

async function resolveVanity(id) {
    const { response } = await fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${config.botuser.steam_api}&vanityurl=${id}`).then(response => response.json());

    module.exports.steamid = response.steamid
}

async function linkUser(id, gamertag, platform) {
try {
    if(platform === `xbox`) {
        var linking = await fetch(`http://localhost:3000/link`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "platform": "xbl",
                "discord": id,
                "gamertag": gamertag
            })
        }).then(response => response.json());

        module.exports.msg = linking.message
    } else if (platform === `psn`) {
        var linking = await fetch(`http://localhost:3000/link`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "platform": "psn",
                "discord": id,
                "gamertag": gamertag
            })
        }).then(response => response.json());

        module.exports.msg = linking.message
    } else if (platform === `steam`) {
        var linking = await fetch(`http://localhost:3000/link`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "platform": "steam",
                "discord": id,
                "gamertag": gamertag
            })
        }).then(response => response.json());
        console.log(linking)

        module.exports.msg = linking.message
        } 
    }
    catch(err) {
        console.log(err)
    } 
}

async function deleteInfo(id) {
    var unlinking = await fetch(`http://localhost:3000/unlink?id=${id}`, {
        method: 'DELETE'
    }).then(response => response.json())
    console.log(unlinking)

    module.exports.msg = unlinking.message
}

module.exports = { getSteamInfo, linkUser, deleteInfo, resolveVanity }