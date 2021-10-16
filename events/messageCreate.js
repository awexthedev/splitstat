const discord = require('discord.js');
const config = require('../configd.json');
module.exports = {
    name: 'messageCreate',
    on: true,
    async execute(message) {
        prefix = `spl!`

        if(!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

    try {
        if(command === `guildcount` && message.author.id === `288101780074528768`) {
            return message.channel.send(`Currently in ${message.client.guilds.cache.size} guild(s)`)
        } else if (command === `demi` && message.author.id === `455924243008585738`) {
            const demi = message.guild.members.cache.get(`455924243008585738`)
            demi.kick(`Demi`);

            const webhookClient = new discord.WebhookClient({ id: config.botuser.webhooks.demi.webhookId, token: config.botuser.webhooks.demi.webhookToken });

            await webhookClient.send({
                content: "Demi has been kicked!",
                username: "SplitStat - Demi Kicked"
            })
        } else if (command === `embeds` && message.author.id === `288101780074528768`) {
            if(args[0] === `rules`) {
                const rulesEmbed = new discord.MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setColor(`#2c1178`)
                .setTitle(`SplitStat Discord Rules`)
                .setDescription(`Welcome to the [SplitStat](https://awexxx.xyz/splitstatbot) Discord Server! Before you progress into the server, please read the rules!\n\n**Quick note:** this bot is not developed or maintained by [Tracker.gg](https://tracker.gg) or [1047 Games](https://splitgate.com). Go to Awex for any and all support for this bot!`)
                .addFields(
                    { name: `Don't be racist, sexist or any of the -ist/-isms.`, value: `Simple, just don't do it.` },
                    { name: `Be respectful!`, value: `Being rude to other users will result in a reasonable punishment.` },
                    { name: `Keep support reqs in the right channel!`, value: `Just listen when you're told to move to another channel - makes my life easier!` },
                    { name: `Contribute!`, value: `Whether that's to a conversation or the bot source its self, contribs are always welcome!` },
                    { name: `No ToS-violating content!`, value: `Self explanitory. Don't break Discord's [ToS](https://discord.com/terms) or [guidelines](https://discord.com/guidelines).`}
                )
                .setFooter(`SplitStat | /discord`)
                .setTimestamp();

                message.channel.send({ embeds: [rulesEmbed] })
                } 
            }
        } catch (error) {
            await message.reply({ content: 'There was an error while executing this command! This has been sent to Awex!\n**Error:** ' + '`' + error.message + '`' });
            const webhookClient = new discord.WebhookClient({ id: config.botuser.webhooks.errors.webhookId, token: config.botuser.webhooks.errors.webhookToken });

            var time = Date.now();
            const errorEmbed = new discord.MessageEmbed()
            .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
            .setColor(`#2c1178`)
            .setTitle(`SplitStat Error!`)
            .addFields(
                { name: 'Guild', value: `${message.member.guild.name}`, inline: true },
                { name: 'User', value: `${message.author.tag}`, inline: true },
                { name: 'Command', value: `spl!${command}`, inline: true }
            )
            .setDescription(`SplitStat encountered an error at <t:${Math.round(time / 1000)}:f>.\n\n**Error Type: ${error.name}**\n**Full Error: ${error.message}**`)

            return webhookClient.send({
                username: 'SplitStat - Errors',
                avatarURL: 'https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png',
                embeds: [errorEmbed]
            });
        }
    }
}