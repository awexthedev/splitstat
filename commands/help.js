module.exports = {
    name: 'help',
    execute(client, message, MessageEmbed) {
        const helpEmbed = new MessageEmbed()
        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
        .setTitle(`SplitStat`)
        .setColor(`#2c1178`)
        .setDescription(`SplitStat is a Discord bot that fetches stats from the [Tracker Network](https://tracker.gg) and returns them to you!\n\nNote that this bot is **not** affiliated with [1047 Games](https://splitgate.com) or [The Tracker Network](https://tracker.gg).`)
        .addFields(
            { name: 'spl!lookup [vanity-url-value]', value: `The main thing! Look up your Splitgate stats using your Steam Vanity URL Value (to find this, see **spl!stathelp**.)`, inline: true },
            { name: 'spl!stathelp', value: 'As mentioned, helps you get your Steam Vanity URL value.', inline: true },
            { name: 'spl!cat', value: `Gives all the categories you can use when spl!lookup prompts you for a category.`, inline: false, },
            { name: 'spl!profile [vanity-url-value]', value: `Returns some basic information TRN uses to format your profile (profile picture, Steam64ID etc).`, inline: true },
            { name: 'spl!complain [message]', value: `Allows you to send me a message! Feel free to use this as a suggestion tool or to vent about your frustration regarding this bot!`, inline: true },
            { name: 'spl!changelog', value: 'Shows the latest updates to this bot.', inline: true  },
            { name: 'spl!info', value: 'Gives info about the internals of me!', inline: true },
            { name: 'spl!link [vanity-url-value]', value: `Gives me permission to save your Steam64ID with your Discord ID and removes the requirement for the vanity url value in spl!lookup.`, inline: true },
            { name: 'spl!unlink', value: `Removes you from SplitStat's database entirely.`}
        )
        .setFooter(`SplitStat`)
        .setTimestamp();

        message.channel.send({ embeds: [helpEmbed] })
    }
}