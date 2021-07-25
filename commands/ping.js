module.exports = {
    name: 'ping',
    execute(client, discord, message, args) {
        message.channel.send(`Bot ping: ${Date.now() - message.createdTimestamp}ms\nDiscord API Latency: ${Math.round(client.ws.ping)}ms`)
    }
}