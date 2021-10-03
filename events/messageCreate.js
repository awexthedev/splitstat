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
        }
    }
}