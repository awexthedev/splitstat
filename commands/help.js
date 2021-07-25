module.exports = {
    name: 'help',
    execute(client, discord, message, args) {
        const helpEmbed = new discord.MessageEmbed()
        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
        .setTitle(`SplitStat`)
        .setColor(`#2c1178`)
        .setDescription(`SplitStat is a Discord bot that fetches stats from the [Tracker Network](https://tracker.gg) and returns them to you!\n
    To get started, run **spl!stat [your-steam64-decid]** (see **spl!idhelp** to learn how to find the decid) and test it out!\n\n**Note**: SplitStat is not affiliated with 1047 Games or the Tracker Network.`)
        .setFooter(`SplitStat`)
        .setTimestamp();

        message.channel.send(helpEmbed)
    }
}