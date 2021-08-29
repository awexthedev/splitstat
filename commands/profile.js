const api = require('../modules/api.js');
module.exports = {
    name: 'profile',
    async execute(message, args, MessageEmbed) {
        if(!args.length) {
                const missingArgs = new MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setTitle(`Not so fast!`)
                .setColor(`#2c1178`)
                .setDescription(`No arguments to correctly search for that user were provided. Please make sure your usage is correct!`)
                .setFooter(`SplitStat`)
                .setTimestamp();
    
                return message.reply({ embeds: [ missingArgs ] })
        } else {
            const platform = args[0]
            const player = args[1]

            if (!platform || !player) {
                const missingArgs = new MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setTitle(`Not so fast!`)
                .setColor(`#2c1178`)
                .setDescription(`Uh oh, something was undefined! Make sure you provided all 3 arguments before continuing.`)
                .setFooter(`SplitStat`)
                .setTimestamp();
    
                return message.reply({ embeds: [ missingArgs ] })
            }

            await api.fetchTrnApi(player, platform, args)
            console.log(api.errmsg)

            if (api.errmsg === `User ${player} doesn't exist in Tracker Network's ${platform} API`) {
                const missingArgs = new MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setTitle(`Not so fast!`)
                .setColor(`#2c1178`)
                .setDescription(`Woah there! **${player}** wasn't found in Tracker Network's API! Are you sure it was the right name?`)
                .setFooter(`SplitStat`)
                .setTimestamp();
    
                return message.reply({ embeds: [ missingArgs ] })
            } else if (api.errmsg === `Platform is invalid`) {
                const missingArgs = new MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setTitle(`Not so fast!`)
                .setColor(`#2c1178`)
                .setDescription(`Uh oh! **${platform}** is not a valid platform!`)
                .setFooter(`SplitStat`)
                .setTimestamp();
    
                return message.reply({ embeds: [ missingArgs ] })
            } else if(api.error === true || !api.trn) {
                const missingArgs = new MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setTitle(`Not so fast!`)
                .setColor(`#2c1178`)
                .setDescription('Uh oh! Something went wrong during the processing phase. This has been reported to Awex and will be fixed soon.\n**Error: `' + api.errmsg + '`**')
                .setFooter(`SplitStat`)
                .setTimestamp();
    
                return message.reply({ embeds: [ missingArgs ] })
            }

            const profileEmbed = new MessageEmbed()
            .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
            .setColor(`#2c1178`)
            .setTitle(`${api.profile.platformInfo.platformUserHandle} -- ${api.profile.platformInfo.platformSlug}`)
            .addFields(
                { name: `Country Code`, value: `${api.profile.userInfo.countryCode}`, inline: true },
                { name: `\u200B`, value: `\u200B`, inline: true },
                { name: `Partner?`, value: `${api.profile.userInfo.isPartner}`, inline: true },
                { name: `Verified?`, value: `${api.profile.userInfo.isVerified}`, inline: true },
                { name: `Influencer?`, value: `${api.profile.userInfo.isInfluencer}`, inline: true }
            )
            .setFooter(`SplitStat`)
            .setTimestamp();
    
            return message.reply({ embeds: [profileEmbed] })
        }
    }
}