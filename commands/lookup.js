const fetch = require('../modules/stats');
const catTypes = require('../modules/types');

module.exports = {
    name: 'lookup',
    async execute(interaction, args, channelId) {
        const platform = args[0];
        const player = args[1];
        const category = args[2];

        const validPlatforms = new Set(["xbl", "psn", "steam"]);

        if(player.includes("https")) return interaction.messages.send(channelId, "Please send your Steam URL **without** the prefacing https!");

        if (!platform || !player || !category) return interaction.messages.send(channelId, "**You didn't provide a platform, category or player!** Please see **spl!help** for more information.")
        if(!validPlatforms.has(platform)) return interaction.messages.send(channelId, "**You provided an incorrect platform!** Please make sure you're providing one of the following; `steam, xbl, psn`.")

        var data = await fetch.fetch_stats(platform, player)
        .catch(function (error) {
            console.log(error)
        })

        var message = "Here are your stats for the **" + category + "** category!";

        var stat = catTypes[category.toLowerCase()];
        for(var i = 0; i < stat.length; i++) {
            message += "\n**" + data.trn.segments[0].stats[stat[i]].displayName + "** - " + data.trn.segments[0].stats[stat[i]].displayValue;
        }

        return await interaction.messages.send(channelId, message)
    }
}