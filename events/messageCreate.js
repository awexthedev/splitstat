const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'messageCreate',
    on: true,
    async execute(message) {
        var client = message.client;

        if(message.content.includes(`<@!${client.user.id}>`)) {
            const mention = new MessageEmbed()
            .setAuthor({ name: `SplitStat Bot`, iconURL: `https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png` })
            .setColor(`#2c1178`)
            .setTitle(`Hi!`)
            .setDescription("Hey there, I'm SplitStat! I'm an easy way to search for users that play Splitgate on Tracker.gg, all from the comfort of your Discord server.\n\nPlease keep in mind this bot is **not** made by 1047 Games or Tracker.gg. This is a fan-made project and all inquiries regarding the game or platform should go to those respective teams.\n\nYou can read what data SplitStat processes [here](https://thatalex.dev/splitstat/privacy).")

            return message.reply({ embeds: [mention] });
        }
    }
}