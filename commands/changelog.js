module.exports = {
    name: 'changelog',
    execute(message, MessageEmbed) {
      const changelogEmbed = new MessageEmbed()
      .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
      .setColor(`#2c1178`)
      .setTitle(`Latest Changelog - 08/21/2021`)
      .setDescription(`This update adds the ability to link your Steam ID to your Discord ID in my system to make things extra quick (one less API call to find out who you are ;p)\nThis brings us to **Version 2.1**.`)
      .addFields(
        { name: `Added Linking Ability`, value: `This adds the **linking** feature. You can run **spl!link [your-steam-vanity-url]** to let SplitStat save your Steam ID and your Discord ID -- if you do this, you'll only need to run **spl!lookup** and **spl!profile** since the bot already knows who you are!\nThis does **not** store anything else but your Steam64ID.` },
        { name: `Added a few more values to spl!profile`, value: `Country Code, isPartner/Influencer/Verified (Tracker Network)` },
        { name: `Implemented administration commands`, value: `If you are bad, you get the slap from my blacklist hammer.` }
      )
      .setFooter(`SplitStat`)
      .setTimestamp();

    return message.reply({ embeds: [changelogEmbed] });
    }
}