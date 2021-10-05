const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const discord = require('discord.js');
const chalk = require('chalk');
const axios = require('axios');
const config = require('../configd.json');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const webhookClient = new discord.WebhookClient({ id: config.botuser.webhooks.voting.webhookId, token: config.botuser.webhooks.voting.webhookToken });

app.get('/', (req, res) => {
    return res.redirect(`https://awexxx.xyz/`)
})

app.get('/heartbeat', (req, res) => {
    return res.status(200).send({ "status": 200, "message": "API Online!"})
})

app.post('/webhook', async (req, res) => {
    try {
        const user = await axios.get(`https://discord.com/api/users/${req.body.user}`, {
            method: 'GET',
            headers: { 'authorization': `Bot ${config.botuser.token}` }
        })

        if(req.body.user) {
            await webhookClient.send({
                content: `Thanks **${user.data.username}#${user.data.discriminator}** for [voting for SplitStat](https://top.gg/bot/868689248218411050/vote) on **Top.gg**!`,
                username: `SplitStat - Voting!`,
                avatarURL: `https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png`
            })
        } else {
            res.status(500).send({ "stauts": 500, "message": "Incorrect payload sent" })
        }

    } catch(err) {
        console.log(chalk.redBright.bold(`API error!`), err)
        return res.status(500).send({ "status": 500, "errors": err.message })
    }

    return res.status(200).send({ "status": 200, "message": "Event successfully emitted to Discord" })
})

app.listen(1330, () => {
    console.log(`Listening on PORT 1330`)
})