module.exports = {
    name: 'changelog',
    execute(message, MessageEmbed) {
      const changelogEmbed = new MessageEmbed()
      .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
      .setColor(`#2c1178`)
      .setTitle(`Latest Changelog - 08/23/2021`)
      .setDescription(`This update adds the ability to link your Steam ID to your Discord ID in my system to make things extra quick (one less API call to find out who you are ;p)\nThis brings us to **Version 2.2**.`)
      .addFields(
        { name: `Implemented Caching API`, value: `This allows the bot easy access to data, and to cache frequently used data (like stats!).\nNote that this is **only available to linked accounts at the moment**, expect it to come to everyone next update :p` },
        { name: `Moved most heavy lifting to the API`, value: `This speeds some things up and makes handling some web related errors easier as well as cleans up the bot source *quite* a bit.` },
        { name: `(hopefully) fixed spamming issues in some guilds`, value: `spl!lookup would sometimes spam channels when used, I believe I have fixed that issue.`},
        { name: `Coming Soon: Viewing Profiles via Tag`, value: `This will allow you to use spl!profile [mention] to see someone elses profile (if they've linked).`}
      )
      .setFooter(`SplitStat`)
      .setTimestamp();

    return message.reply({ embeds: [changelogEmbed] });
    }
}