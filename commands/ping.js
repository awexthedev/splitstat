module.exports = {
    name: 'ping',
    execute(bot, message) {
        return message.channel.send('Bot ping: ' + '`' + `${Date.now() - message.createdTimestamp}` + 'ms`\nDiscord API Latency: ' + '`' + `${Math.round(bot.ws.ping)}` + 'ms`')
    }
}