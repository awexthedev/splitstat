var fetch = require('node-fetch');
var uuid = require('uuid');
var { embed } = require('../config.json');

    error = false;
    Global = {}

module.exports = {
    name: 'link',
    async execute(message, args, MessageEmbed) {

        if (!args.length) {
            const missingArgs = new MessageEmbed()
            .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
            .setColor(`#2c1178`)
            .setTitle(`Not so fast!`)
            .setDescription(`Hey! You forgot your Steam Vanity URL!\nPlease see the steps in **spl!stathelp** if you need assistance finding this, it is crucial to the linking process!`)
        
            return message.reply({ embeds: [missingArgs] });
        } else {
            Global.vanityUser = `${args[0]}`
            await fetchSteam(Global.vanityUser);

            if (Global.msg === 'No match') {
                return message.reply(`Sorry, but I didn't get a hit for **${Global.vanityUser}** in Steam's API. Run **spl!stathelp** if you need help obtaining your URL.`);
            }

            const confirmation = await message.reply(`I got a hit for ${Global.vanityUser} (Steam64ID **${Global.steamid}**)!\nMake sure this is your account; https://steamcommunity.com/profiles/${Global.steamid}\n\n**You accept that you will not link others accounts to your Discord account and understand that I can revoke your privilege of using my features if you abuse this system regularly.**\n\nOne last thing; You consent to me saving your Steam ID and linking it to your Discord username. I never gain access to your account and all the code I use to save your ID is up on https://github.com/awexxx/splitstat.\nIf you're okay with that, please type **yes**. If you changed your mind, say **no**.`);
            const filter = (m) => m.author.id === message.author.id;
            const collector = confirmation.channel.createMessageCollector(filter, {
                time: 60000,
                });

                collector.on('collect', async (msg) => {
                    if(msg.content.toLowerCase().startsWith(`yes`)) {
                        collector.stop();
                        let splitLink = await fetch(`http://localhost:3000/link`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ "steamId": Global.steamid, "vanity": Global.vanityUser, "discordId": message.author.id })
                        }).then(response => response.json())

                        if (splitLink.message === `Something went wrong while I tried to link that account.`) {
                            message.reply(`Sorry, something went wrong when trying to link you to ${Global.vanityUser}! Your issue has been posted to Awex and your case ID is **${splitLink.caseid}**.`)
                            embed.embeds[0].title = `Case ID ${splitLink.caseid}`
                            embed.embeds[0].description = `User; ${message.author}\nLinking-related (APIError)`
                            fetch(`${process.env.error_webhook_url}`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(embed)
                            })
                        } else if (splitLink.message === `User already exists in database`) {
                            message.reply(`**That user already exists in my database!** If your account was possibly linked to another user, please contact Awex to force-unlink them.`)
                        } else {
                            return message.reply(`I added you to the database! Thanks for linking! You can unlink at any time by running **spl!unlink**!`);
                        }

                    } else if (msg.content.toLowerCase().startsWith(`no`)) {
                        collector.stop()
                        return msg.reply(`Got it! Let me know if you want to try again soon!`)
                    } else {
                        msg.reply(`Sorry, I didn't quite get that. Could you try that again? It's one word! Yes! (or no, if you've changed your mind)`)
                    }
                })
        }

        async function fetchSteam(vanity) {
            var url_steam = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.steam_key}&vanityurl=${vanity}`
            var { response } = await fetch(`${url_steam}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).then(response => response.json()).catch(err => {
                error = true;
                var cid = uuid.v4();
                const errorEmbed = new MessageEmbed()
                .setAuthor(`SplitStat Bot`, `https://images.mmorpg.com/images/games/logos/32/1759_32.png?cb=87A6A764853AF7668409F25907CC7EC4`)
                .setColor(`#2c1178`)
                .setTitle(`It's not you, it's me.`)
                .setDescription(`Woah there, not so fast! Something went wrong while trying to run profile's searching process.\nThe dev of this bot (awex) has been notified with a case number.\nIf you'd like to check in with him, your case ID is **${cid}** & you can join his server [here](https://discord.gg/VNtCsBrrNd) to figure out what happened.`)
                .setFooter(`SplitStat`)
                .setTimestamp();
        
                message.channel.send({ embeds: [errorEmbed] })
                embed.embeds[0].title = `Case ID ${cid}`
                embed.embeds[0].description = `User; ${message.author}\n${err}`

                fetch(`${process.env.error_webhook_url}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(embed)
                })
                return;
            })

            Global.msg = response.message;
            Global.steamid = response.steamid;
        }
    }
}