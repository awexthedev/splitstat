module.exports = {
    name: 'idhelp',
    execute(client, discord, message, args) {
        const idEmbed = new discord.MessageEmbed()
        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
        .setColor(`#2c1178`)
        .setTitle(`Find your ID!`)
        .setDescription(`**You no longer require your Steam64 ID. You should use a vanity URL! This embed goes over how.**

        Make sure you have a [custom URL](https://www.makeuseof.com/how-to-set-up-custom-url-steam-profile/) (learn to do that there!). You'll need it.
        When you're running **spl!stat**, input that value. For example, if my custom URL value set was _awexxx, you'd run **spl!stat _awexxx**.

        **This bot cannot make use of nicknames or usernames due to limitations of TRN's API and Steam's API. Please note that you need to use your vanity url value at this moment.**`)
        .setFooter(`SplitStat`)
        .setTimestamp();
    
    return message.channel.send({ embeds: [idEmbed] })
    }
}