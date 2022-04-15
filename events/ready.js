const logger = require("../modules/logger");
// const { MessageEmbed } = require('discord.js');
const { env } = require('../config.json');
const wh = require('../modules/webhook');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        logger.info("SplitStat Guilded has started.");
        await wh("Bot has started!");
    }
}