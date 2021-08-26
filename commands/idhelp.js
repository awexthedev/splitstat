module.exports = {
    name: 'stathelp',
    execute(message, MessageEmbed) {
        const idEmbed = new MessageEmbed()
        .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
        .setColor(`#2c1178`)
        .setTitle(`Find your ID!`)
        .setDescription(`To find your Steam ID, use [this site](https://steamidfinder.com)!\nYou can input either a vanity URL or the complete URL to your Steam profile!\nThe ID you want is the Steam64ID (DEC).`)
        .setFooter(`SplitStat`)
        .setTimestamp();
    
        return message.reply({ embeds: [idEmbed] })
    }
}