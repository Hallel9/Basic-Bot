const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'whois',
    category: 'fun',
    description: 'Displays info about the mentioned user.',
    usage: `whois <@user>`,
    run: async (client, message, args) => {
        const member = message.mentions.members.first();

        if (!member)
            return message.channel.send('You must mention a user that you want information about.').then(m => m.delete({timeout: 5000}));

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(member.user.username)
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setDescription(`Here is some information I found for ${member}`)
            .addField('User ID', member.user.id)
            .addField('Account created at', member.user.createdAt)
            .addField('Joined server at', member.joinedAt)
            .addField('Last message', member.lastMessage.content)
            .addField('Highest role', member.roles.highest)
            .addField('All roles', member.roles.cache.map(r => `${r}`).join(' | '))
            .addField('Bot?', member.user.bot)

        return message.channel.send(embed).catch(err => console.error(err));
    }
}