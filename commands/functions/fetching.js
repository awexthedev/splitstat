var fetch = require('node-fetch');

async function fetchUser(id) {
    var userData = await fetch(`http://localhost:3000/search?user=${id}`).then(response => response.json());
    module.exports.userData = userData
}

module.exports = { fetchUser }