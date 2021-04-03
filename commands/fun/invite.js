const invite = 'https://discord.com/api/oauth2/authorize?client_id=723710749234430103&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard%2Fcallback&scope=bot'
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'invite',
    description: 'Sends an invite for the bot',
    category: 'fun',
    usage: 'invite',
    async run(client, message, args) {
        const embed = new MessageEmbed()
            .setTitle('Invite')
            .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Invite me [here](${invite})!`)
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}`)
        message.channel.send(embed)
    }
}