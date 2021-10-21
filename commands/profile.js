const redis = require('../modules/redis-handler');
const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');

const redisPack = require('async-redis');
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

            var value = await rc.get(player)
            var data = JSON.parse(value)

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
}