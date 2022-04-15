const { WebhookClient } = require('@guildedjs/webhook-client');
const config = require('../config.json');
module.exports = async (content) => {
    if(!content) return false;
    var client = new WebhookClient({ id: config.client.dev.webhook.id, token: config.client.dev.webhook.token });

    await client.send(content)
    return true;
}