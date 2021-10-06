const discord = require('discord.js');
const config = require('../configd.json');
module.exports = {
    name: 'messageCreate',
    on: true,
    async execute(message) {
        prefix = `spl!`

        if(!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        if(command === `guildcount` && message.author.id === `288101780074528768`) {
            return message.channel.send(`Currently in ${message.client.guilds.cache.size} guild(s)`)
        } else if (command === `demi` && message.author.id === `455924243008585738`) {
            const demi = message.guild.members.cache.get(`455924243008585738`)
            demi.kick(`Demi`);

            const webhookClient = new discord.WebhookClient({ id: config.botuser.webhooks.demi.webhookId, token: config.botuser.webhooks.demi.webhookToken });

            await webhookClient.send({
                content: "Demi has been kicked!",
                username: "SplitStat - Demi Kicked"
            })
        }
    }
}