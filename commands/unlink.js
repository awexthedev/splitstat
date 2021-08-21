module.exports = {
    name: 'unlink',
    async execute(message, args, MessageEmbed, Tags, Sequelize) {

        deleteInfo();

        async function deleteInfo() {
            const rowCount = await Tags.destroy({ where: { username: message.author.id } });
            if (!rowCount) return message.reply(`**You're not linked to any user!** If your account was possibly linked to another user, please contact Awex to force-unlink them.`);

            return message.reply(`**Successfully unlinked!** Sorry to see you go :(\nIf you have anything you'd like to ask Awex, feel free to use **spl!complain**!`);
        }
    }
}