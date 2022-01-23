const steam = require("../steam");
const db = require('../db');

async function link(platform, user, dsc) {
    if(platform === 'steam') {
        var obj = await steam(user);
        var part = obj.id;
    } else var part = user;
    var check = await db(`SELECT * FROM users WHERE id=${part}`);
    if(check.length !== 0) {
        return false;
    } else db(`INSERT INTO users (id, gameid, dscid) VALUES ('${part}', '${platform}', '${dsc}')`)
    return true;
}

async function unlink(id) {
    var check = await db(`SELECT * FROM users WHERE dscid=${id}`);
    if(check.length === 0) {
        return false;
    } else db(`DELETE FROM users WHERE dscid=${id}`)
    return true;
}

async function addFriend(discordId, targetId) {
    var grab = await db(`SELECT friends FROM users WHERE id=${discordId}`)

    var add = await db(`UPDATE users SET friends=[${targetId}] WHERE dscid=${discordId}`)
}

module.exports = { link, unlink, addFriend };