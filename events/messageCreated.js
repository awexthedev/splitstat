const config = require('../config.json');
const wh = require('../modules/webhook');

module.exports = {
    name: 'messageCreated',
    on: true,
    async execute(message) {
        const prefix = config.prefix;
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        try {
            if (command === "lookup") {
                require("../commands/lookup").execute(message.client, args, message.channelId);
            } else if (command === "match") {
                require("../commands/match").execute(message.client, args, message.channelId);
            } else if (command === "help") {
                require("../commands/help").execute(message.client, args, message.channelId);
            }
        } catch (err) {
            message.client.messages.send(message.channelId, "Uh oh! Something went wrong when running that command! This has been reported to Alex!")
            return await wh("**Something went wrong!**\nCommand: " + command);
        }
    }
}