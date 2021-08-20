var fetch = require('node-fetch');
var uuid = require('uuid');
var { complainembed, embed } = require('../config.json');

module.exports = {
    name: 'complain',
    async execute(bot, message, args, MessageEmbed) {
        const complaint = args.slice(0).join(' ');

        try {
            complainembed.embeds[0].title = `Complaint from ${message.author.username}`
            complainembed.embeds[0].description = `${complaint}`
            complainembed.embeds[0].author.icon_url = `${message.author.avatarURL()}`
            fetch(`${process.env.error_webhook_url}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(complainembed)
            })

            message.reply(`Thanks for that, ${message.author}. I've passed your complaint onto the developer of me!\nOne more thing; if you want to be responded to (i'm not magic :(), please join the support server! https://discord.gg/mpVmytjvyn`)
        }
        catch(err) {
            var cid = uuid.v4();
            const errorEmbed = new MessageEmbed()
            .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
            .setColor(`#2c1178`)
            .setTitle(`It's not you, it's me.`)
            .setDescription(`**Woah there!**\nI ran into an issue submitting your complaint. If you still want to try to submit it, please join Awex's server [here](https://discord.gg/mpVmytjvyn).\n\nI've also forwarded this to him. Your case ID is **${cid}**.`)
            .setFooter(`SplitStat`)
            .setTimestamp();
    
            message.channel.send({ embeds: [errorEmbed] })
            embed.embeds[0].title = `Case ID ${cid}`
            embed.embeds[0].description = `User; ${message.author}\n**${err}**`

            fetch(`${process.env.error_webhook_url}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(embed)
            }) 
        }
    }
}