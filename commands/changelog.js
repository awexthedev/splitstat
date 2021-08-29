module.exports = {
    name: 'changelog',
    execute(message, MessageEmbed) {
      const changelogEmbed = new MessageEmbed()
      .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
      .setColor(`#2c1178`)
      .setTitle(`Latest Changelog - 08/29/2021`)
      .setDescription(`Even more rewriting, error catching, and more!\nThis update brings SplitStat to **Version 2.4!**`)
      .addFields(
        { name: 'Removed linking system', value: "In preparation for future features and more brainstorming. PS and XBX made this very complicated lmao" },
        { name: 'Rewrote lookup backend', value: "This now catches even more errors and should prevent the bot from crashing." },
        { name: 'Updated profile command', value: "Tied it into the same system as lookup, just querying for different data" }
      )
      .setFooter(`SplitStat`)
      .setTimestamp();

    return message.reply({ embeds: [changelogEmbed] });
    }
}