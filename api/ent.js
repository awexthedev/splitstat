// const express = require('express');
// const fs = require('fs');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const Sequelize = require('sequelize');
// const http = require('http');
// const NodeCache = require("node-cache");
// const fetch = require('node-fetch');
// const config = require('../configd.json');

// const sequelize = new Sequelize('database', 'user', 'password', {
// 	host: 'localhost',
// 	dialect: 'sqlite',
// 	logging: false,
// 	// SQLite only
// 	storage: 'database.sqlite',
// });

// const Storage = sequelize.define('storage', {
//     platform: {
//         type: Sequelize.STRING
//     },
// 	discordId: {
//         type: Sequelize.INTEGER,
//         unique: true,
//     },
//     gamertag: {
//         type: Sequelize.STRING
//     }
// });

// const app = express();
// const myCache = new NodeCache();

// app.use(cors());
// app.use(morgan('dev'));
// app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.send({ "status": 200 });
// });

// app.get('/search', async (req, res) => {
//     const user = req.query.user;
//         if(!user) {
//             return res.status(500).send({ "status": 500, "message": "No user was provided" })
//         }

//         const usr = await Storage.findOne({ where: { discordId: user } });
    
//         try {
//             if (cache.has('uniqueKey')) {
//                 console.log(`Found TRN data for ${user} in cache, displaying`)
//                 res.status(200).send({ "status": 200, "user": { "platform": usr.get('platform'), "gamertag": usr.get('gamertag') }, "trn": cache.get('uniqueKey') })
//             } else {
//                 if (tag) {
//                     var trnurl = `https://public-api.tracker.gg/v2/splitgate/standard/profile/${usr.get('platform')}/${tag.get('sid')}`
//                     const data = await fetch(`${trnurl}`, {
//                         method: 'GET',
//                         headers: { 'TRN-Api-Key': `${config.botuser.trn_api}` }
//                     }).then(response => response.json());
//                     myCache.set('uniqueKey', data);
//                     res.status(200).send({ "status": 200, "user": { "platform": usr.get('platform'), "gamertag": usr.get('gamertag') }, "trn": data })
//             } else {
//                 return res.status(404).send({ "status": 404, "message": "User not found" })  
//             }
//         }
//     }
//     catch(err) {
//         return res.status(500).send({ "status": 500, "message": "Failed to fetch user, unknown error occurred."})
//         }
// })

// app.post('/link', async (req, res) => {
//     try {
//         console.log(req.body)
//         const tag = await Storage.create({
//             platform: req.body.platform,
//             discordId: req.body.discord,
//             gamertag: req.body.gamertag
//         });
//         return res.status(200).send({ "status": 200, "message": "User added to database" });
//     }
//     catch (error) {
//         console.log(error)
//         var uuid = require('uuid');
//         var cid = uuid.v4();
//         if (error.name === 'SequelizeUniqueConstraintError') {
//             return res.status(500).send({ "status": 500, "message": "User already exists in database" });
//         }
//         res.status(500).send({ "status": 500, "error": error, "message": "Something went wrong while I tried to link that account.", "caseid": cid});
//     }
// })

// app.delete('/unlink', async (req, res) => {
//     const user = req.query.id;

//     const rowCount = await Storage.destroy({ where: { discordId: user } });
//     cache.del(`uniqueKey`)
//     if(!rowCount) return res.status(404).send({ "status": 404, "message": "User does not exist" });
//     return res.status(200).send({ "status": 200, "message": "User unlinked" });
// })

// app.get('/heartbeat', (req, res) => {
//     res.send({ "status": 200, "message": "HELO"})
// })

// const httpServer = http.createServer(app);
// httpServer.listen(3000, () => {
//     console.log(`Started the SplitStat API.`);
//     Storage.sync();
// })


const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Sequelize = require('sequelize');
const http = require('http');
const NodeCache = require("node-cache");
const fetch = require('node-fetch');
const config = require('../configd.json');

const app = express();
const cache = new NodeCache();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Storage = sequelize.define('storage', {
    platform: {
        type: Sequelize.STRING
    },
	discordId: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    gamertag: {
        type: Sequelize.STRING
    }
});

// const Xbox = sequelize.define('xbox', {
//     gamertag: {
//         type: Sequelize.STRING,
//         unique: true,
//     },
//     discordId: {
//         type: Sequelize.INTEGER,
//         unique: true
//     }
// });

// const psn = sequelize.define('psn', {
//     psnid: {
//         type: Sequelize.STRING,
//         unique: true,
//     },
//     discordId: {
//         type: Sequelize.INTEGER,
//         unique: true
//     }
// })

app.get('/', (req, res) => {
    return res.status(200).send({ "status": 200, "message": "SplitStat Internal API" })
})

app.post('/link', async (req, res) => {
    try {
        console.log(req.body)
        const tag = await Storage.create({
            platform: req.body.platform,
            discordId: req.body.discord,
            gamertag: req.body.gamertag
        });
        return res.status(200).send({ "status": 200, "message": "User added to database" });
    }
    catch (error) {
        console.log(error)
        var uuid = require('uuid');
        var cid = uuid.v4();
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(500).send({ "status": 500, "message": "User already exists in database" });
        }
        res.status(500).send({ "status": 500, "error": error, "message": "Something went wrong while I tried to link that account.", "caseid": cid});
    }
})

app.delete('/unlink', async (req, res) => {
    const user = req.query.id;

    const rowCount = await Storage.destroy({ where: { discordId: user } });
    cache.del(`uniqueKey`)
    if(!rowCount) return res.status(404).send({ "status": 404, "message": "User does not exist" });
    return res.status(200).send({ "status": 200, "message": "User unlinked" });
})

app.get('/search', async (req, res) => {
    var user = req.query.user;

    try {
        const usr = await Storage.findOne({ where: { discordId: user } });

        if (cache.has('uniqueKey')) {
            console.log(`TRN data found for ${user}, displaying`)
            res.status(200).send({ "status": 200, "user": { "discordid": usr.get('discordId'), "platform": usr.get('platform'), "gamertag": usr.get('gamertag') }, "trn": cache.get('uniqueKey') })      
        } else if (user) {

        if (usr) {
            var trnurl = `https://public-api.tracker.gg/v2/splitgate/standard/profile/${usr.get('platform')}/${usr.get('gamertag')}`
            const data = await fetch(`${trnurl}`, {
                method: 'GET',
                headers: { 'TRN-Api-Key': `${config.botuser.trn_api}` }
            }).then(response => response.json());
            cache.set('uniqueKey', data);
            res.status(200).send({ "status": 200, "user": { "platform": usr.get('platform'), "discordid": usr.get('discordId'), "gamertag": usr.get('gamertag') }, "trn": data })
        } else {
            res.status(404).send({ "status": 404, "message": "User not found" })
        }
    }
}
catch(err) {
    console.log(err)
}
})

app.get('/heartbeat', (req, res) => {
    res.send({ "status": 200, "message": "HELO"})
})



const httpServer = http.createServer(app);
httpServer.listen(3000, () => {
    console.log(`Started the SplitStat API.`);

    Storage.sync();
})




