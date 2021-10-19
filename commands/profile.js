const redis = require('../modules/redis-handler');
const api = require('../modules/fetchit');
const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');

const redisPack = require('redis');
const rc = redisPack.createClient();

module.exports = {
    name: 'profile',
    data: new SlashCommandBuilder()
    .setName(`profile`)
    .setDescription(`Your Splitgate/Tracker Network profile!`)
    .addStringOption(option => 
        option.setName(`platform`)
            .setDescription(`Platform you're on.`)
            .setRequired(true)
            .addChoice('Xbox', 'xbl')
            .addChoice('PlayStation', 'psn')
            .addChoice('Steam', 'steam'))
    .addStringOption(option => (
        option.setName(`player`)
        .setDescription(`Your ID/Gamertag! For Steam, your Steam Profile URL!.`)
              .setRequired(true))),
              info: {
                "name": 'Profile',
                "description": "See a summary of your Tracker Network Profile!",
                "image": "https://scr.awexxx.xyz/upload?view=DiscordCanary_rZYp5vvlV7.png",
                "usage": "/profile [platform] [user]"
                },
    async execute(interaction) {
            const platform = interaction.options.getString(`platform`);
            const player = interaction.options.getString('player');

            await redis.cacheData(player.toLowerCase(), platform);

            rc.get(player, async function(error, reply) {
                if(reply === null) {
                    await api.fetchTrnApi(player.toLowerCase(), platform)

                    if (api.errmsg === `User ${player} doesn't exist in Tracker Network's ${platform} API`) {
                        const fourohfour = new discord.MessageEmbed()
                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                        .setTitle(`Not so fast!`)
                        .setColor(`#2c1178`)
                        .setDescription(`Woah there! **${player}** wasn't found in Tracker Network's ${platform} API! Are you sure it was the right name & platform?`)
                        .setFooter(`SplitStat | /discord`)
                        .setTimestamp();
            
                        return await interaction.reply({ embeds: [ fourohfour ] })
                    } else if (api.errmsg === `Need to provide a URL for Steam user!`) {
                        const noUrl = new discord.MessageEmbed()
                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                        .setTitle(`Not so fast!`)
                        .setColor(`#2c1178`)
                        .setDescription('Uh oh! You used **Steam** as a way to find your stats. I need a URL to your Steam profile, not your username!')
                        .setFooter(`SplitStat | /discord`)
                        .setTimestamp();
            
                        return await interaction.reply({ embeds: [ noUrl ] })
                    } else if(api.error === true) {
                        const unhandledError = new discord.MessageEmbed()
                        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                        .setTitle(`Not so fast!`)
                        .setColor(`#2c1178`)
                        .setDescription('Uh oh! Something went wrong during the processing phase that was not handled. This has been reported to Awex and will be fixed soon.\n**Error: `' + api.errmsg + '`**')
                        .setFooter(`SplitStat | /discord`)
                        .setTimestamp();
            
                        return await interaction.reply({ embeds: [ unhandledError ] })
                    }

                    const profileEmbed = new discord.MessageEmbed()
                    .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                    .setColor(`#2c1178`)
                    .setTitle(`${api.allObjects.platformInfo.platformUserHandle} -- ${platform}`)
                    .addFields(
                        { name: `Country Code`, value: `${api.allObjects.userInfo.countryCode}`, inline: true },
                        { name: `Partner?`, value: `${api.allObjects.userInfo.isPartner}`, inline: true },
                        { name: `Verified?`, value: `${api.allObjects.userInfo.isVerified}`, inline: true },
                        { name: `Influencer?`, value: `${api.allObjects.userInfo.isInfluencer}`, inline: true },
                        { name: 'TRN Premium?', value: `${api.allObjects.userInfo.isPremium}`, inline: true }
                    )
                    .setFooter(`SplitStat | /discord`)
                    .setTimestamp();
            
                    await interaction.reply({ embeds: [ profileEmbed ] })
                } else {
                    var data = JSON.parse(reply)

                    
            const profileEmbed = new discord.MessageEmbed()
            .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
            .setColor(`#2c1178`)
            .setTitle(`${data.profileData.platformUserHandle} -- ${platform}`)
            .addFields(
                { name: `Country Code`, value: `${data.profileData.countryCode}`, inline: true },
                { name: `Partner?`, value: `${data.profileData.isPartner}`, inline: true },
                { name: `Verified?`, value: `${data.profileData.isVerified}`, inline: true },
                { name: `Influencer?`, value: `${data.profileData.isInfluencer}`, inline: true },
                { name: 'TRN Premium?', value: `${data.profileData.isPremium}`, inline: true }
            )
            .setFooter(`SplitStat | /discord`)
            .setTimestamp();
    
            await interaction.reply({ embeds: [ profileEmbed ] })
                }
            })

            // if (api.errmsg === `User ${player} doesn't exist in Tracker Network's ${platform} API`) {
            //     const fourohfour = new discord.MessageEmbed()
            //     .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
            //     .setTitle(`Not so fast!`)
            //     .setColor(`#2c1178`)
            //     .setDescription(`Woah there! **${player}** wasn't found in Tracker Network's ${platform} API! Are you sure it was the right name & platform?`)
            //     .setFooter(`SplitStat | /discord`)
            //     .setTimestamp();
    
            //     return await interaction.reply({ embeds: [ fourohfour ] })
            // } else if (api.errmsg === `Need to provide a URL for Steam user!`) {
            //     const noUrl = new discord.MessageEmbed()
            //     .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
            //     .setTitle(`Not so fast!`)
            //     .setColor(`#2c1178`)
            //     .setDescription('Uh oh! You used **Steam** as a way to find your stats. I need a URL to your Steam profile, not your username!')
            //     .setFooter(`SplitStat | /discord`)
            //     .setTimestamp();
    
            //     return await interaction.reply({ embeds: [ noUrl ] })
            // } else if(api.error === true) {
            //     const unhandledError = new discord.MessageEmbed()
            //     .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
            //     .setTitle(`Not so fast!`)
            //     .setColor(`#2c1178`)
            //     .setDescription('Uh oh! Something went wrong during the processing phase that was not handled. This has been reported to Awex and will be fixed soon.\n**Error: `' + api.errmsg + '`**')
            //     .setFooter(`SplitStat | /discord`)
            //     .setTimestamp();
    
            //     return await interaction.reply({ embeds: [ unhandledError ] })
            // }
    }
}