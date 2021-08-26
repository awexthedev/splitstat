module.exports = {
    name: 'changelog',
    execute(message, MessageEmbed) {
      const changelogEmbed = new MessageEmbed()
      .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
      .setColor(`#2c1178`)
      .setTitle(`Latest Changelog - 08/26/2021`)
      .setDescription(`Console support, rewrites, you name it! It's all in this update!\nThis update brings SplitStat to **Version 2.3!**`)
      .addFields(
        { name: `Rewrote backend`, value: `The entire bot has shiny new insides! The API and all commands have been rewritten!` },
        { name: `PlayStation & Xbox support!`, value: `Thanks to Tracker Network, you console players can now look up your stats!` },
        { name: `Coming soon: Slash Commands`, value: `Slash commands are coming!!! Ahhhhh!!!!!` },
        { name: `Fixed spamming issue`, value: `Some had an issue where the bot would go haywire when they put in an incorrect value, replying to its self. This has been fixed.` },
        { name: `Improved linking system`, value: `Linking has a less chance of erroring out now!` }
      )
      .setFooter(`SplitStat`)
      .setTimestamp();

    return message.reply({ embeds: [changelogEmbed] });
    }
}