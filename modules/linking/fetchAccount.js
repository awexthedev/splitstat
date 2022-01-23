const db = require('../db');
module.exports = async (id) => {
    var check = await db(`SELECT * FROM users WHERE dscid=${id}`);
    if(check.length === 0) {
        return false;
    } 
    return check[0];
}