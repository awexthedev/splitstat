const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Sequelize = require('sequelize');
const http = require('http');
const NodeCache = require("node-cache");
const fetch = require('node-fetch');
require('dotenv').config();

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Tags = sequelize.define('tags', {
	sid: {
		type: Sequelize.STRING,
		unique: true,
	},
	username: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    vanity: {
        type: Sequelize.STRING,
        unique: true
    }
});

const app = express();
const myCache = new NodeCache();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({ "status": 200 });
});

app.get('/search', async (req, res) => {
    const user = req.query.user;
    const searchBy = req.query.searchby;

    if(searchBy) {
        if (searchBy.toLowerCase() === 'vanity') {
            let vanity = req.query.vanity;
            const tag = await Tags.findOne({ where: { vanity: vanity } });
            return res.status(200).send({ "status": 200, "user": { "vanity": tag.get('vanity'), "discordid": tag.get('username'), "steamid": tag.get('sid') }})
        }  
    } else {

        if(!user) {
            return res.status(500).send({ "status": 500, "message": "No user was provided" })
        }

        const tag = await Tags.findOne({ where: { username: user } });
    
        if(myCache.has('uniqueKey')){
           console.log(`Found TRN data for ${user} in cache, displaying`)
           res.status(200).send({ "status": 200, "user": { "vanity": tag.get('vanity'), "discordid": tag.get('username'), "steamid": tag.get('sid') }, "trn": myCache.get('uniqueKey') })
   
      } else {
       if (tag) {
       var trnurl = `https://public-api.tracker.gg/v2/splitgate/standard/profile/steam/${tag.get('sid')}`
       const data = await fetch(`${trnurl}`, {
           method: 'GET',
           headers: { 'TRN-Api-Key': `${process.env.api_key}` }
       }).then(response => response.json());
       myCache.set('uniqueKey', data)
           return res.status(200).send({ "status": 200, "user": { "vanity": tag.get('vanity'), "discordid": tag.get('username'), "steamid": tag.get('sid') }, "trn": data })
       } else {
           return res.status(404).send({ "status": 404, "message": "User not found" })
           }
    }
    }
})

app.post('/link', async (req, res) => {
    try {
        const tag = await Tags.create({
            sid: req.body.steamId,
            username: req.body.discordId,
            vanity: req.body.vanity
        });
        return res.status(200).send({ "status": 200, "message": "User added to database" });
    }
    catch (error) {
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
    const unlinkMethod = req.query.method;

    if(unlinkMethod) {
        if (unlinkMethod.toLowerCase() === `vanity`) {
            const rowCount = await Tags.destroy({ where: { vanity: user } });
            if(!rowCount) return res.status(404).send({ "status": 404, "message": "User does not exist" });
            return res.status(200).send({ "status": 200, "message": "User unlinked" });
        }
    }
    const rowCount = await Tags.destroy({ where: { username: user } });
    if(!rowCount) return res.status(404).send({ "status": 404, "message": "User does not exist" });
    return res.status(200).send({ "status": 200, "message": "User unlinked" });
})

app.get('/heartbeat', (req, res) => {
    res.send({ "status": 200, "message": "HELO"})
})

const httpServer = http.createServer(app);
httpServer.listen(3000, () => {
    console.log(`Started the SplitStat API.`);
    Tags.sync();
})
