const { WebhookClient } = require('discord.js');
const config = require('../config.json');
module.exports = async (object) => {
    if(!object.embeds || !object.avatarURL || !object.username) return false;
    var client = new WebhookClient({ id: config.client.dev.webhook.id, token: config.client.dev.webhook.token });

    await client.send({
        username: object.username,
        avatarURL: object.avatarURL,
        embeds: [object.embeds]
    }).catch(function(err) {
        return err.message;
    })

    return true;
}