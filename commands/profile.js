var fetch = require('node-fetch');
module.exports = {
    name: 'profile',
    async execute(message, args, MessageEmbed) {
        var splitstatApi = await fetch(`http://localhost:3000/search?user=${message.author.id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json());
        
        if (splitstatApi.status === 200) {
            trn = splitstatApi.trn.data.platformInfo;
            trnu = splitstatApi.trn.data.userInfo;
        
                const profileEmbed = new MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setColor(`#2c1178`)
                .setTitle(`${trn.platformUserHandle} -- Steam`)
                .setURL(`https://steamcommunity.com/profiles/${trn.platformUserId}`)
                .addFields(
                    { name: 'Steam64ID', value: `${trn.platformUserId}`, inline: true },
                    { name: `Country Code`, value: `${trnu.countryCode}`, inline: true },
                    { name: `\u200B`, value: `\u200B`, inline: true },
                    { name: `Partner?`, value: `${trnu.isPartner}`, inline: true },
                    { name: `Verified?`, value: `${trnu.isVerified}`, inline: true },
                    { name: `Influencer?`, value: `${trnu.isInfluencer}`, inline: true }
                )
                .setThumbnail(`${trn.avatarUrl}`)
                .setFooter(`SplitStat`)
                .setTimestamp();
        
                return message.reply({ embeds: [profileEmbed] })
        } else if (splitstatApi.status === 404) {
            if(!args.length) {
                const missingArgs = new MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setColor(`#2c1178`)
                .setTitle(`Not so fast!`)
                .setDescription(`Hey! Slow down, you're not getting anything without a Steam vanity URL value!
                To learn how to find that, please run **spl!stathelp** and then add into spl!profile (spl!profile [steam-url-value], ex. spl!profile _awexxx)`)
            
                return message.reply({ embeds: [missingArgs] });
            } else {
                const customVanity = args.slice(0).join(' ');
                await getInfo(customVanity);
        
                if(error === 'true') {
                    return;
                }
        
                var trnurl = `https://public-api.tracker.gg/v2/splitgate/standard/profile/steam/${global.steamid}`
                const data = await fetch(`${trnurl}`, {
                    method: 'GET',
                    headers: { 'TRN-Api-Key': `${process.env.api_key}` }
                }).then(response => response.json()).catch(err => {
                    error = true;
                    var cid = uuid.v4();
                    const errorEmbed = new MessageEmbed()
                    .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                    .setColor(`#2c1178`)
                    .setTitle(`It's not you, it's me.`)
                    .setDescription(`Woah there, not so fast! Something went wrong while trying to run spl!profile's fetching process.\nThe dev of this bot (awex) has been notified with a case number.\nIf you'd like to check in with him, your case ID is **${cid}** & you can join his server [here](https://discord.gg/VNtCsBrrNd) to figure out what happened.`)
                    .setFooter(`SplitStat`)
                    .setTimestamp();
            
                    message.channel.send({ embeds: [errorEmbed] })
                    embed.embeds[0].title = `Case ID ${cid}`
                    embed.embeds[0].description = `User; ${message.author}\n${err}`
        
                    fetch(`${process.env.error_webhook_url}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(embed.embeds[0])
                    })
                })
        
                trn = data.data.platformInfo;
                trnu = data.data.userInfo;
        
                try {
        
                const profileEmbed = new MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setColor(`#2c1178`)
                .setTitle(`${trn.platformUserHandle} -- Steam`)
                .setURL(`https://steamcommunity.com/profiles/${trn.platformUserId}`)
                .addFields(
                    { name: 'Steam64ID', value: `${trn.platformUserId}`, inline: true },
                    { name: `Country Code`, value: `${trnu.countryCode}`, inline: true },
                    { name: `\u200B`, value: `\u200B`, inline: true },
                    { name: `Partner?`, value: `${trnu.isPartner}`, inline: true },
                    { name: `Verified?`, value: `${trnu.isVerified}`, inline: true },
                    { name: `Influencer?`, value: `${trnu.isInfluencer}`, inline: true }
                )
                .setThumbnail(`${trn.avatarUrl}`)
                .setFooter(`SplitStat`)
                .setTimestamp();
        
                return message.reply({ embeds: [profileEmbed] })
                }
                catch(err) {
                            var cid = uuid.v4();
                            const errorEmbed = new MessageEmbed()
                            .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                            .setColor(`#2c1178`)
                            .setTitle(`It's not you, it's me.`)
                            .setDescription(`Woah there, not so fast! Something went wrong while trying to run spl!profile's searching process.\nThe dev of this bot (awex) has been notified with a case number.\nIf you'd like to check in with him, your case ID is **${cid}** & you can join his server [here](https://discord.gg/VNtCsBrrNd) to figure out what happened.`)
                            .setFooter(`SplitStat`)
                            .setTimestamp();
                    
                            message.channel.send({ embeds: [errorEmbed] })
                            embed.embeds[0].title = `Case ID ${cid}`
                            embed.embeds[0].description = `User; ${message.author}\n**${err}**`
        
                            var webHookPost = await fetch(`${process.env.error_webhook_url}`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(embed)
                            })
                }
        
                async function getInfo(username) {
                    var url_steam = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.steam_key}&vanityurl=${username}`
                        var { response } = await fetch(`${url_steam}`, {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' }
                        }).then(response => response.json()).catch(err => {
                            error = true;
                            var cid = uuid.v4();
                            const errorEmbed = new MessageEmbed()
                            .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                            .setColor(`#2c1178`)
                            .setTitle(`It's not you, it's me.`)
                            .setDescription(`Woah there, not so fast! Something went wrong while trying to run profile's searching process.\nThe dev of this bot (awex) has been notified with a case number.\nIf you'd like to check in with him, your case ID is **${cid}** & you can join his server [here](https://discord.gg/VNtCsBrrNd) to figure out what happened.`)
                            .setFooter(`SplitStat`)
                            .setTimestamp();
                    
                            message.channel.send({ embeds: [errorEmbed] })
                            embed.embeds[0].title = `Case ID ${cid}`
                            embed.embeds[0].description = `User; ${message.author}\n${err}`
        
                            fetch(`${process.env.error_webhook_url}`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(embed)
                            })
                            return;
                        })
        
                        global.steamid = response.steamid;
                }
            }
        }
    }
}