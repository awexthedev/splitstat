const db = require('../db.js');
const fetchAccount = require('./fetchAccount.js');

async function store(aid, fid) {

    var checkTotal = await db(`SELECT * FROM friends WHERE user_id=${aid} AND pending=1 OR friend_id=${aid} AND pending=1`);
    if(checkTotal.length >= 10) return false;

    var check = await db(`SELECT * FROM friends WHERE user_id=${aid} AND friend_id=${fid}`);
    if(check.length === 0) {
        await db(`INSERT INTO friends (pending, user_id, friend_id) VALUES (1, ${aid}, ${fid})`);
        return true;
    } else return false;
}

async function remove(aid, fid) {
    var check = await db(`SELECT * FROM friends WHERE user_id=${aid} OR friend_id=${aid} AND friend_id=${fid} OR user_id=${fid}`);
    if(check.length === 0) return false;

    await db(`DELETE FROM friends WHERE user_id=${aid} OR friend_id=${aid} AND friend_id=${fid} OR user_id=${fid}`);
    return true;
}

async function accept(aid, fid) {
    // Check if the user is pending a friend request from the friend
    var check = await db(`SELECT * FROM friends WHERE user_id=${fid} AND friend_id=${aid} AND pending=1`);
    if(check.length === 0) return false;
    // Accept the friend request
    await db(`UPDATE friends SET pending=0 WHERE user_id=${fid} AND friend_id=${aid}`);
    return true;
}

async function deny(aid, fid) {
    // Check if the user is pending a friend request from the friend
    var check = await db(`SELECT * FROM friends WHERE user_id=${fid} AND friend_id=${aid} AND pending=1`);
    if(check.length === 0) return false;
    // Deny the friend request
    await db(`DELETE FROM friends WHERE user_id=${fid} AND friend_id=${aid}`);
    return true;
}

async function all(aid) {
    // Get all friends of the user
    var check = await db(`SELECT * FROM friends WHERE friend_id=${aid} AND pending=0 OR user_id=${aid} AND pending=0`);
    var checkPending = await db(`SELECT * FROM friends WHERE friend_id=${aid} AND pending=1 OR user_id=${aid} AND pending=1`);
    var friends = check.length;
    var pending = [];
    var requests = [];

    for(var i = 0; i < checkPending.length; i++) {
        if(checkPending[i].user_id === aid) {
            var check = await db(`SELECT dscid FROM users WHERE id=${checkPending[i].friend_id}`);
            requests.push(check[0].dscid);
        } else if (checkPending[i].friend_id === aid) {
            var check = await db(`SELECT dscid FROM users WHERE id=${checkPending[i].user_id}`);
            pending.push(check[0].dscid);
        }
    }

    return {
        added: friends,
        pending: pending,
        requests: requests
    }
}

module.exports = { store, remove, accept, deny, all };