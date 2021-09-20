const api = require('../modules/api.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js');

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
    async execute(interaction) {
            const platform = interaction.options.getString(`platform`);
            const player = interaction.options.getString('player');

            await api.fetchTrnApi(player, platform, interaction)

            if (api.errmsg === `User ${player} doesn't exist in Tracker Network's ${platform} API`) {
                const fourohfour = new discord.MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setTitle(`Not so fast!`)
                .setColor(`#2c1178`)
                .setDescription(`Woah there! **${player}** wasn't found in Tracker Network's ${platform} API! Are you sure it was the right name & platform?`)
                .setFooter(`SplitStat`)
                .setTimestamp();
    
                return await interaction.reply({ embeds: [ fourohfour ] })
            } else if (api.errmsg === `Need to provide a URL for Steam user!`) {
                const noUrl = new discord.MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setTitle(`Not so fast!`)
                .setColor(`#2c1178`)
                .setDescription('Uh oh! You used **Steam** as a way to find your stats. I need a URL to your Steam profile, not your username!')
                .setFooter(`SplitStat`)
                .setTimestamp();
    
                return await interaction.reply({ embeds: [ noUrl ] })
            } else if(api.error === true || !api.trn) {
                const unhandledError = new discord.MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setTitle(`Not so fast!`)
                .setColor(`#2c1178`)
                .setDescription('Uh oh! Something went wrong during the processing phase that was not handled. This has been reported to Awex and will be fixed soon.\n**Error: `' + api.errmsg + '`**')
                .setFooter(`SplitStat`)
                .setTimestamp();
    
                return await interaction.reply({ embeds: [ unhandledError ] })
            }

            const profileEmbed = new discord.MessageEmbed()
            .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
            .setColor(`#2c1178`)
            .setTitle(`${api.profile.platformInfo.platformUserHandle} -- ${platform}`)
            .addFields(
                { name: `Country Code`, value: `${api.profile.userInfo.countryCode}`, inline: true },
                { name: `User ID`, value: `${api.profile.userInfo.userId}`, inline: true },
                { name: `Partner?`, value: `${api.profile.userInfo.isPartner}`, inline: true },
                { name: `Verified?`, value: `${api.profile.userInfo.isVerified}`, inline: true },
                { name: `Influencer?`, value: `${api.profile.userInfo.isInfluencer}`, inline: true },
                { name: 'TRN Premium?', value: `${api.profile.userInfo.isPremium}`, inline: true }
            )
            .setFooter(`SplitStat`)
            .setTimestamp();
    
            return await interaction.reply({ embeds: [ profileEmbed ] })
    }
}