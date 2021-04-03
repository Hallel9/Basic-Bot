const { MessageEmbed } = require('discord.js');
const package = require('../../package.json')
const { version } = require('../../package.json')
const array = [];
const array1 = [];

module.exports = {
    name: 'botinfo',
    category: 'fun',
    description: 'Displays info about the bot.',
    usage: `botinfo`,
    run: async (client, message, args) => {
        client.guilds.cache.forEach((g) => array.push(g));
        client.users.cache.forEach((c) => array1.push(c));
        const embed = new MessageEmbed()
            .setAuthor(client.user.tag, client.user.displayAvatarURL())
            .setFooter(`Requested by ${message.author.tag}`)
            .setTitle(`Info for ${client.user.tag}`)
            .setColor('RANDOM')
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .addField('Client ID', client.user.id)
            .addField('Created At', client.user.createdAt)
            .addField('Verified?', client.user.verified)
            .addField('Partial', client.user.partial)
            .addField('Version', version)
            .addField('discord.js Version', package.dependencies['discord.js'])
            .addField('npm version', package.dependencies['npm'])
            .addField('Main Bot File', package.main)
        message.channel.send(embed)
    }
}