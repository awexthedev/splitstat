var fetch = require('node-fetch');
const steam = require('../modules/info.js');
const uniqueErr = require('../dev/bot');
var uuid = require('uuid');

module.exports = {
    name: 'link',
    async execute(message, args, MessageEmbed) {
        const confirmation = await message.reply(`Hey there ${message.author}!\nFirstly, to begin the linking process, what platform are you on? (Xbox, Playstation, Steam)`);
        const filter = (m) => m.author.id === message.author.id;
        const collector = confirmation.channel.createMessageCollector(filter, {
            time: 60000,
            });

        collector.on('collect', async (msg) => {
            if (msg.content.toLowerCase().startsWith(`xbox`)) {
                collector.stop();
                await message.reply(`Got it, you're on Xbox! Now, what is your gamertag?`)

                const filter = (m) => m.author.id === message.author.id;
                const collectorid = confirmation.channel.createMessageCollector(filter, {
                    time: 60000,
                    });

                    collectorid.on('collect', async (msgid) => {
                            try {
                            collectorid.stop();
                            await steam.linkUser(message.author.id, msgid.content, `xbox`)
                            if(steam.msg === `User already exists in database`) {
                                return msgid.reply(`That user already exists in the database!`)
                            } else if (steam.msg === `Something went wrong while I tried to link that account.`) {
                                return msgid.reply(`**Sorry, something went wrong!**\nAwex has been notified of the error.`)
                            } else if (steam.msg === `User added to database`) {
                                return msgid.reply(`**Success!**`)
                            }
                        }
                        catch(err) {
                            return msgid.reply(`**Sorry, something went wrong!**\nAwex has been notified of the error.`)
                        }
                    })
            } else if (msg.content.toLowerCase().startsWith(`steam`)) {
                collector.stop();
                await message.reply(`Got it! What is your Steam profile link?`)

                const filter = (m) => m.author.id === message.author.id;
                const collectorid = confirmation.channel.createMessageCollector(filter, {
                    time: 60000,
                    });

                    collectorid.on('collect', async (msgid) => {
                            try {
                            if(msgid.content.toLowerCase().includes(`steamcommunity.com/profiles`)) {
                                collectorid.stop();
                                var url = `${msgid.content}`
                                var part = url.split("/")[4];
                                await steam.linkUser(msgid.author.id, part, `steam`)   
                                if(steam.msg === `User already exists in database`) {
                                    return msgid.reply(`That user already exists in the database!`)
                                } else if (steam.msg === `Something went wrong while I tried to link that account.`) {
                                    return msgid.reply(`**Sorry, something went wrong!**\nAwex has been notified of the error.`)
                                } else if (steam.msg === `User added to database`) {
                                    return msgid.reply(`**Success!**`)
                                }
                            } else if (msgid.content.toLowerCase().includes(`steamcommunity.com/id`)) {
                                collectorid.stop();
                                var url = `${msgid.content}`
                                var part = url.split("/")[4];

                                await steam.resolveVanity(part)
                                await steam.linkUser(msgid.author.id, steam.steamid, `steam`)  

                                if(steam.msg === `User already exists in database`) {
                                    return msgid.reply(`That user already exists in the database!`)
                                } else if (steam.msg === `Something went wrong while I tried to link that account.`) {
                                    return msgid.reply(`**Sorry, something went wrong!**\nAwex has been notified of the error.`)
                                } else if (steam.msg === `User added to database`) {
                                    return msgid.reply(`**Success!**`)
                                }
                            }
                        }
                        catch(err) {
                            collectorid.stop();
                            console.log(err)
                            return msgid.reply(`**Sorry, something went wrong!**\nAwex has been notified of the error.`)
                        }
                    })
            } else if (msg.content.toLowerCase().startsWith(`playstation`)) {
                await message.reply(`Got it, you're on Playstation! Now, what is your gamertag?`)

                const filter = (m) => m.author.id === message.author.id;
                const collectorid = confirmation.channel.createMessageCollector(filter, {
                    time: 60000,
                    });

                    collectorid.on('collect', async (msgid) => {
                            try {
                            collectorid.stop();
                            await steam.linkUser(msgid.author.id, msgid.content, `psn`)
                            if(steam.msg === `User already exists in database`) {
                                return msgid.reply(`That user already exists in the database!`)
                            } else if (steam.msg === `Something went wrong while I tried to link that account.`) {
                                return msgid.reply(`**Sorry, something went wrong!**\nAwex has been notified of the error.`)
                            } else if (steam.msg === `User added to database`) {
                                return msgid.reply(`**Success!**`)
                            }
                        }
                        catch(err) {
                            return msgid.reply(`**Sorry, something went wrong!**\nAwex has been notified of the error.`)
                        }
                    })
            }
        })
    }
}