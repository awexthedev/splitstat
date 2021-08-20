module.exports = {
    name: 'info',
    execute(message, MessageEmbed) {
        const infoEmbed = new MessageEmbed()
        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
        .setColor(`#2c1178`)
        .setTitle(`SplitStat Information`)
        .setDescription(`This command lists everything about what the bot uses.\n\nThis bot was developed by [Awex](https://github.com/awexxx) and is not affiliated with 1047 Games and/or Tracker.gg (The Tracker Network).\n`)
        .addFields(
            { name: `node-fetch (https://npmjs.com/package/node-fetch)`, value: `Handles all web API fetching (both Steam & TRN's APIs)` },
            { name: `uuid (https://npmjs.com/package/uuid)`, value: `Generates case IDs when [*everything* goes wrong](https://www.youtube.com/watch?v=nqVbnFtT_PU)` },
            { name: `dotenv (https://npmjs.com/package/dotenv)`, value: `Hides tokens, webhook URLs etc.` },
            { name: `And obviously discord.js (https://npmjs.com/package/discord.js)`, value: `Handles everything related to Discord and its API (which is, like, everything)`}
        )
        .setFooter(`SplitStat`)
        .setTimestamp();

        return message.reply({ embeds: [infoEmbed] });
    }
}