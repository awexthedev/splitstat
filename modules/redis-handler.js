const config = require('../configd.json');

const redis = require('redis');
const axios = require('axios').default;
const rc = redis.createClient();

async function cacheData(user, platform) {

    await rc.get(user, async function(err, reply) {
        if(reply === null) {
            console.log(`Not cached, performing exist checks`)

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
                    module.exports.obj = response.data.data.segments[0] 

                    const cacheData = {
                        "killData": {
                            "killsOnHill": response.data.data.segments[0].stats.enemyKillsOnHill.value,
                            "firstBloods": response.data.data.segments[0].stats.firstBloods.value,
                            "flagCarrierKills": response.data.data.segments[0].stats.flagCarrierKills.value,
                            "flagKills": response.data.data.segments[0].stats.flagKills.value,
                            "highestConsecutiveKills": response.data.data.segments[0].stats.highestConsecutiveKills.value,
                            "killsAsVIP": response.data.data.segments[0].stats.killsAsVIP.value,
                            "killsOnHill": response.data.data.segments[0].stats.killsOnHill.value,
                            "oddballKills": response.data.data.segments[0].stats.oddballKills.value,
                            "revengeKills": response.data.data.segments[0].stats.revengeKills.value,
                            "killsPerMatch": response.data.data.segments[0].stats.killsPerMatch.value,
                            "killsPerMinute": response.data.data.segments[0].stats.killsPerMinute.value,
                            "headshotKills": response.data.data.segments[0].stats.headshotKills.value,
                            "collaterals": response.data.data.segments[0].stats.collaterals.value,
                            "meleeKills": response.data.data.segments[0].stats.meleeKills.value,
                            "assists": response.data.data.segments[0].stats.assists.value,
                            "kills": response.data.data.segments[0].stats.kills.value
                        },
                        "accuracyData": {
                            "headshotsLanded": response.data.data.segments[0].stats.headshotsLanded.value,
                            "shotsAccuracy": response.data.data.segments[0].stats.shotsAccuracy.value,
                            "shotsLanded": response.data.data.segments[0].stats.shotsLanded.value,
                            "headshotAccuracy": response.data.data.segments[0].stats.headshotAccuracy.value
                        },
                        "specialData": {
                            "flagsPickedUp": response.data.data.segments[0].stats.flagsPickedUp.value,
                            "flagsReturned": response.data.data.segments[0].stats.flagsReturned.value,
                            "hillsCaptured": response.data.data.segments[0].stats.hillsCaptured.value,
                            "hillsNeutralized": response.data.data.segments[0].stats.hillsNeutralized.value,
                            "oddballsPickedUp": response.data.data.segments[0].stats.oddballsPickedUp.value,
                            "teabagsDenied": response.data.data.segments[0].stats.teabagsDenied.value
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
                            "teabags": response.data.data.segments[0].stats.teabags.value,
                            "damageDealt": response.data.data.segments[0].stats.damageDealt.value,
                            "matchesPlayed": response.data.data.segments[0].stats.matchesPlayed.value,
                            "wins": response.data.data.segments[0].stats.wins.value,
                            "losses": response.data.data.segments[0].stats.losses.value,
                            "timePlayed": response.data.data.segments[0].stats.timePlayed.value,
                            "progressionXp": response.data.data.segments[0].stats.progressionXp.value,
                            "progressionLevel": response.data.data.segments[0].stats.progressionLevel.value,
                            "rankXp": response.data.data.segments[0].stats.rankXp.value,
                            "rankLevel": response.data.data.segments[0].stats.rankLevel.value,
                            "shotsFired": response.data.data.segments[0].stats.shotsFired.value,
                            "shotsLanded": response.data.data.segments[0].stats.shotsLanded.value
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
        
                    await rc.set(user, JSON.stringify(cacheData), 'EX', 60*15);
            }) 
            .catch(function(error) {
                console.log(error)
            })
        } else {
            console.log(`Already cached, no need to do anything.`)
        }
    })
}

module.exports = { cacheData }



