module.exports = {
    name: 'help',
    async execute(interaction, args, channelId) {
        const message = "You can find all documentation for this bot @ https://thatalex.dev/splitstat/docs"
        return await interaction.messages.send(channelId,message);
    }
}