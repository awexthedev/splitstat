module.exports = {
    name: 'cat',
    execute(client, discord, message, args) {
        const catEmbed = new discord.MessageEmbed()
        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
        .setColor(`#2c1178`)
        .setTitle(`Stats Categories`)
        .addFields(
            { name: 'Kills', value: 'Totals/Information of Kills' },
            { name: 'Accuracy', value: 'Total Accuracy with weapons' },
            { name: 'Special', value: 'Misc information; oddball pickups, flag pickups etc' },
            { name: 'Player', value: 'Player info, like KD' },
            { name: 'Streaks', value: 'Killstreak Information' },
            { name: 'Portal', value: 'Things with portals. Kills through them, destroyed etc.'}
        )
        .setFooter(`SplitStat`)
        .setTimestamp();

        return message.channel.send(catEmbed)
    }
}