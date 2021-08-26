var fetch = require('node-fetch');
var config = require('../configd.json');
module.exports = {
    name: 'profile',
    async execute(message, args, MessageEmbed) {
        const member = message.mentions.users.first();

        if(member) {
            var splitstatApi = await fetch(`http://localhost:3000/search?user=${member.id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).then(response => response.json());

            if (splitstatApi.status === 200) {
                trn = splitstatApi.trn.data.platformInfo;
                trnu = splitstatApi.trn.data.userInfo;
            
                    const profileEmbed = new MessageEmbed()
                    .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                    .setColor(`#2c1178`)
                    .setTitle(`${trn.platformUserHandle} -- ${splitstatApi.user.platform}`)
                    .addFields(
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
                const errorEmbed = new MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setColor(`#2c1178`)
                .setTitle(`You did an oopsie!`)
                .setDescription(`${member} hasn't linked their account yet! Oh noes!\nOnce they do, you'll be able to see the info here!`)
                .setFooter(`SplitStat`)
                .setTimestamp();

                return message.reply({ embeds: [ errorEmbed ] })
            }
        } else {
            if(!args.length) {
                var splitstatApi = await fetch(`http://localhost:3000/search?user=${message.author.id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).then(response => response.json());

                if(splitstatApi.status === 200) {
                    trn = splitstatApi.trn.data.platformInfo;
                    trnu = splitstatApi.trn.data.userInfo;
                
                        const profileEmbed = new MessageEmbed()
                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                        .setColor(`#2c1178`)
                        .setTitle(`${trn.platformUserHandle} -- ${splitstatApi.user.platform}`)
                        .addFields(
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

                    const confirmation = await message.reply(`Hey there ${message.author}!\nWhat's the platform of the user you're trying to find the profile of? (Xbox, Steam, Playstation)\nIf you need to cancel at anytime, say **cancel**.`);
                    const filter = (m) => m.author.id === message.author.id;
                    const collector = confirmation.channel.createMessageCollector(filter, {
                        time: 60000,
                        });

                        collector.on('collect', async (msg) => {
                            if(msg.content.toLowerCase().startsWith(`xbox`)) {
                                collector.stop();
                                const confirmation = await msg.reply(`Great! What's their username?`);
                                const filter = (m) => m.author.id === message.author.id;
                                const collector1 = confirmation.channel.createMessageCollector(filter, {
                                    time: 60000,
                                    });

                                    collector1.on('collect', async (msgid) => {
                                        collector1.stop();
                                        try {
                                        var trnurl = `https://public-api.tracker.gg/v2/splitgate/standard/profile/xbl/${msgid.content}`
                                        const data = await fetch(`${trnurl}`, {
                                            method: 'GET',
                                            headers: { 'TRN-Api-Key': `${config.botuser.trn_api}` }
                                        }).then(response => response.json());

                                        if(data.errors) {
                                        if(data.errors[0].code === "CollectorResultStatus::NotFound") {
                                            return msgid.reply(`Sorry, that user doesn't exist on Splitgate **Xbox**.`)
                                        }
                                    }

                                        const profileEmbed = new MessageEmbed()
                                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                                        .setColor(`#2c1178`)
                                        .setTitle(`${data.data.platformInfo.platformUserHandle} -- ${data.data.platformInfo.platformSlug}`)
                                        .addFields(
                                            { name: `Country Code`, value: `${data.data.userInfo.countryCode}`, inline: true },
                                            { name: `\u200B`, value: `\u200B`, inline: true },
                                            { name: `Partner?`, value: `${data.data.userInfo.isPartner}`, inline: true },
                                            { name: `Verified?`, value: `${data.data.userInfo.isVerified}`, inline: true },
                                            { name: `Influencer?`, value: `${data.data.userInfo.isInfluencer}`, inline: true }
                                        )
                                        .setFooter(`SplitStat`)
                                        .setTimestamp();
                                
                                        return message.reply({ embeds: [profileEmbed] })

                                    }
                                    catch(err) {
                                        console.log(err)
                                    }
                                    })
                            } else if (msg.content.toLowerCase().startsWith(`steam`)) {
                                collector.stop();
                                const confirmation = await msg.reply(`Great! What's their Steam64ID? (check spl!stathelp for more info)`);
                                const filter = (m) => m.author.id === message.author.id;
                                const collector1 = confirmation.channel.createMessageCollector(filter, {
                                    time: 60000,
                                    });

                                    collector1.on('collect', async (msgid) => {
                                        collector1.stop();
                                        var trnurl = `https://public-api.tracker.gg/v2/splitgate/standard/profile/steam/${msgid.content}`
                                        const data = await fetch(`${trnurl}`, {
                                            method: 'GET',
                                            headers: { 'TRN-Api-Key': `${config.botuser.trn_api}` }
                                        }).then(response => response.json());

                                        if(data.errors) {
                                            if(data.errors[0].code === "CollectorResultStatus::NotFound") {
                                                return msgid.reply(`Sorry, that user doesn't exist on Splitgate **Steam**.`)
                                        }
                                    }

                                        const steamEmbed = new MessageEmbed()
                                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                                        .setColor(`#2c1178`)
                                        .setTitle(`${data.data.platformInfo.platformUserHandle} -- ${data.data.platformInfo.platformSlug}`)
                                        .addFields(
                                            { name: `Country Code`, value: `${data.data.userInfo.countryCode}`, inline: true },
                                            { name: `\u200B`, value: `\u200B`, inline: true },
                                            { name: `Partner?`, value: `${data.data.userInfo.isPartner}`, inline: true },
                                            { name: `Verified?`, value: `${data.data.userInfo.isVerified}`, inline: true },
                                            { name: `Influencer?`, value: `${data.data.userInfo.isInfluencer}`, inline: true }
                                        )
                                        .setFooter(`SplitStat`)
                                        .setTimestamp();
                                
                                        return message.reply({ embeds: [steamEmbed] })

                                    })
                                } else if (msg.content.toLowerCase().startsWith(`playstation`)) {
                                    collector.stop();
                                    const confirmation = await msg.reply(`Great! What's their PSN ID?`);
                                    const filter = (m) => m.author.id === message.author.id;
                                    const collector1 = confirmation.channel.createMessageCollector(filter, {
                                        time: 60000,
                                        });
    
                                        collector1.on('collect', async (msgid) => {
                                            collector1.stop();
                                            var trnurl = `https://public-api.tracker.gg/v2/splitgate/standard/profile/psn/${msgid.content}`
                                            const data = await fetch(`${trnurl}`, {
                                                method: 'GET',
                                                headers: { 'TRN-Api-Key': `${config.botuser.trn_api}` }
                                            }).then(response => response.json());
    
                                            if(data.errors) {
                                                if(data.errors[0].code === "CollectorResultStatus::NotFound") {
                                                    return msgid.reply(`Sorry, that user doesn't exist on Splitgate **PlayStation**.`)
                                            }
                                        }
    
                                            const steamEmbed = new MessageEmbed()
                                            .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                                            .setColor(`#2c1178`)
                                            .setTitle(`${data.data.platformInfo.platformUserHandle} -- ${data.data.platformInfo.platformSlug}`)
                                            .addFields(
                                                { name: `Country Code`, value: `${data.data.userInfo.countryCode}`, inline: true },
                                                { name: `\u200B`, value: `\u200B`, inline: true },
                                                { name: `Partner?`, value: `${data.data.userInfo.isPartner}`, inline: true },
                                                { name: `Verified?`, value: `${data.data.userInfo.isVerified}`, inline: true },
                                                { name: `Influencer?`, value: `${data.data.userInfo.isInfluencer}`, inline: true }
                                            )
                                            .setFooter(`SplitStat`)
                                            .setTimestamp();
                                    
                                            return message.reply({ embeds: [steamEmbed] })
    
                                        })
                                } else if (msg.content.toLowerCase().startsWith(`cancel`)) {
                                    collector.stop();
                                    return message.reply(`Got it! I've stopped listening.`)
                                }
                        })
                }
            }
        }
    }
} 