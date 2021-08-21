module.exports = {
    name: 'forceunlink',
    async execute(message, args, Tags) {

        if(!args.length) {
            return message.reply(`Usage: forceunlink [steamvanity]`);
        }

        const rowCount = await Tags.destroy({ where: { vanity: args[0] } });
        if (!rowCount) return message.reply(`**${args[0]}** isn't linked to a Discord account.`);

        return message.reply(`**${args[0]}** unlinked.`);
    }
}