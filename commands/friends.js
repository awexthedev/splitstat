const friend = require('../modules/linking/friendsFetch');
const fetchAccount = require('../modules/linking/fetchAccount');
const discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'friends',
    data: new SlashCommandBuilder()
        .setName('friends')
        .setDescription('Find out who your friends are!')
        .addStringOption(option => 
            option.setName('action')
                .setDescription(`Action to perform.`)
                .setRequired(false)
                .addChoice('Add', 'add')
                .addChoice('Remove', 'remove')
                .addChoice('Accept', 'accept')
                .addChoice('Deny', 'deny'))
        .addMentionableOption(option => 
            option.setName('mention')
                .setDescription(`User to perform the action on.`)
                .setRequired(false)),
    info: {
        "name": 'Friends',
        "description": "Access your friends list or add more friends!",
        "image": null,
        "usage": "friends [optional add, optional remove, optional deny, optional accept] [optional mention]",
        "requireArgs": true
    },
    async execute(interaction, args, author) {
        var acc = await fetchAccount(author.id);
        if(acc === false) return interaction.reply('You need to link your account first! Use `link` to link your account!');

        if(!args[0]) {
            // Make a friends list that displays the total number of friends the user has and the number of friends they have left to add.
            var friends = await friend.all(acc.id);
            if(!friends) return interaction.reply(`You don't have any friends added or awaiting acceptance!`);

            var friendsEmbed = new discord.MessageEmbed()
            .setAuthor({ name: `SplitStat Bot`, iconURL: `https://cdn.discordapp.com/app-icons/868689248218411050/cfb8eb37a8dcacefc9228d0949667ff1.png` })
            .setColor(`#2c1178`)
            .setTitle(`Friends`)
            .setDescription(`You have **${friends.added}** friends!\nYou also have **${friends.pending.length}** pending friend requests shown below!\nYou have **${friends.requests.length}** outgoing!`)
            .setFooter({ text: `SplitStat | Need help? awexxx.xyz/splitstat/discord` });

            for(var i = 0; i < friends.pending.length; i++) {
                if (i === 16) return;
                var user = await interaction.client.users.fetch(friends.pending[i]);
                friendsEmbed.addField(`${user.username}#${user.discriminator}`, `Added you as a friend!`);
            }

            for(var i = 0; i < friends.requests.length; i++) {
                if (i === 16) return;
                var user = await interaction.client.users.fetch(friends.requests[i]);
                friendsEmbed.addField(`${user.username}#${user.discriminator}`, `You requested them to be your friend!`);
            }

            return await interaction.reply({ embeds: [friendsEmbed] });
        }

        else if(!args[1]) return interaction.reply('Please provide a mention.');
        else if(args[1].startsWith('<@') && args[1].endsWith('>')) mention = args[1].slice(2, -1).replace('!', '')
        else mention = args[1]

        let duser = interaction.client.users.cache.get(mention);
        if(!duser) return interaction.reply('Please provide a valid user mention.');

        if(args[0] === 'add') {
            var user = await fetchAccount(mention);
            if(!user) return interaction.reply(`I don't see that user.`);
            var resp = await friend.store(acc.id, user.id);
            if(resp) return interaction.reply(`Sent a request to that user. They will need to accept it.`);
            return interaction.reply('You already have that user added or they have too many friend requests!');
        } else if (args[0] === 'remove') {
            var user = await fetchAccount(mention);
            if(!user) return interaction.reply(`I don't see that user.`);
            var resp = await friend.remove(acc.id, user.id);
            if(resp) return interaction.reply(`Removed that user from your friends list.`);
            return interaction.reply(`You don't have that user added!`);
        } else if (args[0] === 'accept') {
            var user = await fetchAccount(mention);
            if(!user) return interaction.reply(`I don't see that user.`);
            var resp = await friend.accept(acc.id, user.id);
            if(resp) return interaction.reply(`Accepted that user as your friend.`);
            return interaction.reply(`You don't have that user added!`);
        } else if (args[0] === 'deny') {
            var user = await fetchAccount(mention);
            if(!user) return interaction.reply(`I don't see that user.`);
            var resp = await friend.deny(acc.id, user.id);
            if(resp) return interaction.reply(`Denied that user as your friend.`);
            return interaction.reply(`You don't have an active friend request from that user!`);
        }
    }
}