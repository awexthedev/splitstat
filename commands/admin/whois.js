var fetch = require('node-fetch');
module.exports = {
    name: 'whois',
    async execute(bot, message, args, MessageEmbed, Tags) {

        if(!args.length) {
            return message.reply(`Usage: whois [steamvanity]`);
        }

        const tag = await Tags.findOne({ where: { vanity: args[0] } });
        if (tag) {
            var discordId = await tag.get('username')
            var vanityUser = await tag.get('vanity')
            var sid = await tag.get('sid')

            var discordApi = `https://discord.com/api/v8/users/${discordId}`
            var userData = await fetch(`${discordApi}`, {
                method: 'GET',
                headers: { 'Authorization': `Bot ${process.env.DISCORD_TOKEN}` }
            }).then(response => response.json());

            const whois = new MessageEmbed()
            .setTitle(`${userData.username}#${userData.discriminator}`)
            .setDescription(`**${userData.username}** is linked to [**SteamID64 ${sid} (${vanityUser})**](https://steamcommunity.com/profiles/${sid}).`)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${discordId}/${userData.avatar}.png?size=128`)

            return message.reply({ embeds: [whois] })
        }
        return message.reply(`User does not exist on Discord at all.`);
    }
}