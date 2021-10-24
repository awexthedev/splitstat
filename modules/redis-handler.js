const config = require('../configd.json');

const redis = require('async-redis');
const math = require('mathjs');
const axios = require('axios').default;
const rc = redis.createClient();

async function cacheLookupData(user, platform) {

    var value = await rc.get(user);

    if (value === null) {
        if(platform === `steam`) {
            if(user.startsWith(`https`) || user.startsWith(`http`)) {
                var part = user.split("/")[4];
                if(user.includes(`steamcommunity.com/id/`)) {
                    const response = await axios.get(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${config.botuser.steam_api}&vanityurl=${part}`)
                    var part = response.data.response.steamid
                }
            }
        } else var part = user;

        var data = await axios.get(`https://public-api.tracker.gg/v2/splitgate/standard/profile/${platform}/${part}`, {
            method: 'GET',
            headers: { 'TRN-Api-Key': `${config.botuser.trn_api}` }
        })
        .then(async function(response) {

            var totalTeabags = await math.evaluate(`${response.data.data.segments[0].stats.teabags.value} + ${response.data.data.segments[0].stats.teabagsDenied.value}`)

            obj = {
                "killData": {
                    "firstBloods": response.data.data.segments[0].stats.firstBloods.value,
                    "highestConsecutiveKills": response.data.data.segments[0].stats.highestConsecutiveKills.value,
                    "revengeKills": response.data.data.segments[0].stats.revengeKills.value,
                    "killsPerMatch": response.data.data.segments[0].stats.killsPerMatch.value,
                    "killsPerMinute": response.data.data.segments[0].stats.killsPerMinute.value,
                    "headshotKills": response.data.data.segments[0].stats.headshotKills.value,
                    "collaterals": response.data.data.segments[0].stats.collaterals.value,
                    "meleeKills": response.data.data.segments[0].stats.meleeKills.value,
                    "assists": response.data.data.segments[0].stats.assists.value,
                    "kills": response.data.data.segments[0].stats.kills.value
                },
                "playlistData": {
                    "oddballKills": response.data.data.segments[0].stats.oddballKills.value,
                    "flagCarrierKills": response.data.data.segments[0].stats.flagCarrierKills.value,
                    "flagKills": response.data.data.segments[0].stats.flagKills.value,
                    "killsOnHill": response.data.data.segments[0].stats.killsOnHill.value,
                    "teabags": `${response.data.data.segments[0].stats.teabags.value}/${totalTeabags}`,
                    "flagsPickedUp": response.data.data.segments[0].stats.flagsPickedUp.value,
                    "flagsReturned": response.data.data.segments[0].stats.flagsReturned.value,
                    "hillsCaptured": response.data.data.segments[0].stats.hillsCaptured.value,
                    "hillsNeutralized": response.data.data.segments[0].stats.hillsNeutralized.value,
                    "oddballsPickedUp": response.data.data.segments[0].stats.oddballsPickedUp.value,
                    "teabagsDenied": response.data.data.segments[0].stats.teabagsDenied.value
                },
                "accuracyData": {
                    "headshotsLanded": response.data.data.segments[0].stats.headshotsLanded.value,
                    "shotsAccuracy": response.data.data.segments[0].stats.shotsAccuracy.value,
                    "shotsLanded": response.data.data.segments[0].stats.shotsLanded.value,
                    "headshotAccuracy": response.data.data.segments[0].stats.headshotAccuracy.value
                },
                "portalData": {
                    "portalKills": response.data.data.segments[0].stats.portalKills.value,
                    "killsThruPortal": response.data.data.segments[0].stats.killsThruPortal.value,
                    "portalsSpawned": response.data.data.segments[0].stats.portalsSpawned.value,
                    "ownPortalsEntered": response.data.data.segments[0].stats.ownPortalsEntered.value,
                    "enemyPortalsEntered": response.data.data.segments[0].stats.enemyPortalsEntered.value,
                    "enemyPortalsDestroyed": response.data.data.segments[0].stats.enemyPortalsDestroyed.value,
                    "distancePortaled": response.data.data.segments[0].stats.distancePortaled.value,
                    "allyPortalsEntered": response.data.data.segments[0].stats.allyPortalsEntered.value
                },
                "streakData": {
                    "kingSlayers": response.data.data.segments[0].stats.kingSlayers.value,
                    "killstreak6": response.data.data.segments[0].stats.medalKillstreak6.value,
                    "killstreak5": response.data.data.segments[0].stats.medalKillstreak5.value,
                    "killstreak4": response.data.data.segments[0].stats.medalKillstreak4.value,
                    "killstreak3": response.data.data.segments[0].stats.medalKillstreak3.value,
                    "killstreak2": response.data.data.segments[0].stats.medalKillstreak2.value,
                    "killstreak1": response.data.data.segments[0].stats.medalKillstreak1.value
                },
                "playerData": {
                    "kd": response.data.data.segments[0].stats.kd.value,
                    "suicides": response.data.data.segments[0].stats.suicides.value,
                    "points": response.data.data.segments[0].stats.points.value,
                    "deaths": response.data.data.segments[0].stats.deaths.value,
                    "kad": response.data.data.segments[0].stats.kad.value,
                    "matchesPlayed": response.data.data.segments[0].stats.matchesPlayed.value,
                    "wins": response.data.data.segments[0].stats.wins.value,
                    "losses": response.data.data.segments[0].stats.losses.value,
                    "timePlayed": response.data.data.segments[0].stats.timePlayed.value,
                },
                "profileData": {
                  "countryCode": response.data.data.userInfo.countryCode,
                  "isPartner": response.data.data.userInfo.isPartner,
                  "isVerified": response.data.data.userInfo.isVerified,
                  "isPremium": response.data.data.userInfo.isPremium,
                  "isInfluencer": response.data.data.userInfo.isInfluencer,
                  "platformUserHandle": response.data.data.platformInfo.platformUserHandle
                }
            }
    
            await rc.set(user, JSON.stringify(obj), 'PX', 30000);
        }) 
        .catch(function(error) {
            console.log(error)
        })
    }
}

async function fetchMatchData(user, platform, matchId) {
    if(platform === `steam`) {
        if(user.startsWith(`https`) || user.startsWith(`http`)) {
            var part = user.split("/")[4];
            if(user.includes(`steamcommunity.com/id/`)) {
                const response = await axios.get(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${config.botuser.steam_api}&vanityurl=${part}`)
                var part = response.data.response.steamid
            }
        }
    } else var part = user;

    if(matchId) {
        var data = await axios.get(`https://public-api.tracker.gg/v1/splitgate/matches/${platform}/direct/${matchId}`, {
            headers: { 'TRN-Api-Key': `${config.botuser.trn_api}` }
        })
        .catch(function(error) {
            console.log(error)
        })

        let obj = {
            "username": part,
            "matchData": {
                "isWinner": data.data.data.children[0].metadata.isWinner,
                "points": data.data.data.children[0].metadata.points,
                "mapImage": data.data.data.metadata.map.imageUrl,
                "mapDisplay": data.data.data.metadata.map.displayValue,
                "mode": data.data.data.metadata.mode.displayValue,
                "playlist": data.data.data.metadata.playlist.displayValue
            }
        }

        module.exports.data = obj
    } else {
        var data = await axios.get(`https://public-api.tracker.gg/v2/splitgate/standard/matches/${platform}/${part}`, {
            headers: { 'TRN-Api-Key': `${config.botuser.trn_api}` }
        })
            let obj = {
                "username": part,
                "matchMetadata": [
                    {
                        "id": data.data.data.matches[0].attributes.id,
                        "mapName": data.data.data.matches[0].metadata.mapName,
                        "queue": data.data.data.matches[0].metadata.queue

                    },
                    {
                        "id": data.data.data.matches[1].attributes.id,
                        "mapName": data.data.data.matches[1].metadata.mapName,
                        "queue": data.data.data.matches[1].metadata.queue
                    },
                    {
                        "id": data.data.data.matches[2].attributes.id,
                        "mapName": data.data.data.matches[2].metadata.mapName,
                        "queue": data.data.data.matches[2].metadata.queue
                    },
                    {
                        "id": data.data.data.matches[3].attributes.id,
                        "mapName": data.data.data.matches[3].metadata.mapName,
                        "queue": data.data.data.matches[3].metadata.queue
                    },
                    {
                        "id": data.data.data.matches[4].attributes.id,
                        "mapName": data.data.data.matches[4].metadata.mapName,
                        "queue": data.data.data.matches[4].metadata.queue
                    },
                ]
            }

            module.exports.data = obj
    }
}

module.exports = { cacheLookupData, fetchMatchData }