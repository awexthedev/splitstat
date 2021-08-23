var fetch = require('node-fetch');
module.exports = {
    name: 'whois',
    async execute(message, args, MessageEmbed) {

        if(!args.length) {
            return message.reply(`Usage: whois [steamvanity]`);
        }

            const { user } = await fetch(`http://localhost:3000/search?searchby=vanity&vanity=${args[0]}`).then(response => response.json());

            console.log(user)

            var discordApi = `https://discord.com/api/v8/users/${user.discordid}`
            var userData = await fetch(`${discordApi}`, {
                method: 'GET',
                headers: { 'Authorization': `Bot ${process.env.DISCORD_TOKEN}` }
            }).then(response => response.json());

            const whois = new MessageEmbed()
            .setTitle(`${userData.username}#${userData.discriminator}`)
            .setDescription(`**${userData.username}** is linked to [**SteamID64 ${user.steamid} (${args[0]})**](https://steamcommunity.com/profiles/${user.steamid}).\n**Discord ID - ${userData.id}**`)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png?size=128`)

            return message.reply({ embeds: [whois] })
    }
}