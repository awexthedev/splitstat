module.exports = {
    name: `messageCreate`,
    on: true,
    execute(msg) {
        prefix = `spl!`
        if(!msg.content.startsWith(prefix) || msg.author.bot) return;
         return msg.reply(`Hey there, ${msg.author}!\nSplitstat has retired message commands completely as of **September 18th, 2021**. You must now use **slash commands**.\nRun **/help** for **Splitstat** to get started!`)
    }
}