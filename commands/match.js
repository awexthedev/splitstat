const { fetch_match } = require('../modules/stats');

module.exports = {
    name: 'match',
    async execute(interaction, args, channelId) {
        const platform = args[0];
        const player = args[1];
        const id = args[2];
        const validPlatforms = new Set(["xbl", "psn", "steam"]);

        if (!platform || !player) return interaction.messages.send(channelId, "**You didn't provide a platform, category or player!** Please see **spl!help** for more information.")
        if(!validPlatforms.has(platform)) return interaction.messages.send(channelId, "**You provided an incorrect platform!** Please make sure you're providing one of the following; `steam, xbl, psn`.")

        if(!id) {
            var data = await fetch_match(null, platform.toLowerCase(), player);
            const message = `Here are your 3 most recent matches! **Tip:** Add the IDs given to the end of the command you just ran..\n**${data.trn.matches[0].attributes.id} on ${data.trn.matches[0].metadata.mapName}**\n**${data.trn.matches[1].attributes.id} on ${data.trn.matches[1].metadata.mapName}**\n**${data.trn.matches[2].attributes.id} on ${data.trn.matches[2].metadata.mapName}**` 

            return await interaction.messages.send(channelId, message)
        } else {
            var data = await fetch_match(id, platform.toLowerCase(), player, false);
            const message = `Here is match id **${id}** on map **${data.trn.metadata.map.displayValue}**!\nDid you win? - ${isWinnerString(data.trn.children[0].metadata.isWinner)}\n**Points** - ${data.trn.children[0].metadata.points}\n**Playlist** - ${data.trn.metadata.playlist.displayValue}\n**Mode** - ${data.trn.metadata.mode.displayValue}` 

            return await interaction.messages.send(channelId, message);
        }

        function isWinnerString(bool) {
            if (bool) return "Yes";
            else return "No";
        }
    }
}