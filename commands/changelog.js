module.exports = {
    name: 'changelog',
    execute(message, MessageEmbed) {
      const changelogEmbed = new MessageEmbed()
      .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
      .setColor(`#2c1178`)
      .setTitle(`Latest Changelog - 08/20/2021`)
      .setDescription(`This update overhauled the bot, adding an improved error handler, complaint system and more, updating it to **Version 2.0**.`)
      .addFields(
        { name: 'Several speed improvements', value: `This includes moving Steam API lookups to their own function, decreased required checks, and more.` },
        { name: `Intro of the Profile command`, value: `This introduced the addition of **spl!profile**, returns users profile picture and Steam64ID.` },
        { name: `Intro of the Complain command`, value: `This introduced the addition of **spl!complain**, a way to contact me when something goes wrong/something isn't added that should be.` },
        { name: `Intro of the Changelog command`, value: `Self explanatory. You're reading it right now.` },
        { name: `Removal of SteamID lookups`, value: `This removed SteamID lookups and now utilizes Steam's **ResolveVanityURL** API. SteamID lookups will make a return if you don't want a custom URL, though!` },
        { name: `Renamed **spl!stat** to **spl!lookup**`, value: `This changes the original stat command to **lookup**! Also changes **spl!idhelp** to **spl!stathelp**.` },
        { name: `Revamped spl!help`, value: `Does what it says lmao` }
      )
      .setFooter(`SplitStat`)
      .setTimestamp();

    return message.reply({ embeds: [changelogEmbed] });
    }
}