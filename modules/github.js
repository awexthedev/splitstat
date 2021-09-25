const fetch = require('node-fetch');
const NodeCache = require('node-cache');
const cache = new NodeCache();
Global = {}

async function fetchGit() {
    const nd = await cache.get('data'); 

    if(nd === undefined) {
        console.log(`Undefined - caching response`)

        const data = await fetch(`https://api.github.com/repos/awexxx/splitstat/commits`).then(response => response.json());
        var date = data[0].commit.author.date
        var newdate = date.slice(0,10)

        Global.gitObj = {
            "commitdate": newdate,
            "latestmsg": data[0].html_url
        }

        cache.set('data', Global.gitObj)
        module.exports.date = newdate
        return module.exports.url = Global.gitObj.latestmsg
    } else if (nd.commitdate !== Global.gitObj.commitdate) {
        console.log(`Not undefined, but changed.`)
        cache.set('data', Global.gitObj)
        module.exports.date = nd.commitdate
        return module.exports.url = nd.latestmsg
    } else {
        module.exports.date = nd.commitdate
        module.exports.url = nd.latestmsg
    }
}

module.exports = {fetchGit}