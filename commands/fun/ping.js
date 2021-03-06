const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')

module.exports = {
    name: 'ping',
    category: 'fun',
    description: 'Returns bot and API latency in milliseconds.',
    usage: `ping`,
    run: async (client, message, args) => {
        const msg = await message.channel.send('** **');

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('🏓 Pong!')
        .setDescription(`Bot Latency is **${Math.floor(msg.createdTimestamp - message.createdTimestamp)} ms** \nAPI Latency is **${Math.round(client.ws.ping)} ms**`);

        msg.edit(embed);
    }
}