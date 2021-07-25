module.exports = {
    name: 'idhelp',
    execute(client, discord, message, args) {
        const idEmbed = new discord.MessageEmbed()
        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
        .setColor(`#2c1178`)
        .setTitle(`Find your ID!`)
        .setDescription(`In order to get your ID for **spl!stat**, follow these steps.\n
    First, head to [this](https://www.steamidfinder.com/) site and you'll see a search bar.\n
    When you're there, open Steam and go to your Steam profile and edit it. Look for the **Custom URL** option.\n
    If there isn't a value in it, put whatever you want in there and save your changes. If there is something in there, head back to the site and put that in the search bar.\n
    For example, if _awexxx was in the Custom URL box, put _awexxx in the search bar on the SteamID Finder site.\n
    You should be given a bunch of info about your Steam profile. Look for **steamID64 (Dec)** and copy that.\n
    Then, run **spl!stat [that-dec-id]** and you should be able to pick a category from **spl!cat**!`)
        .setFooter(`SplitStat`)
        .setTimestamp();
    
    return message.channel.send(idEmbed)
    }
}