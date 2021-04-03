const { MessageEmbed } = require("discord.js");
const array = [];
module.exports = {
  name: "servers",
  description: "Lists all the servers your bot is in",
  category: "fun",
  usage: "servers",
  async run(client, message, args) {
    client.guilds.cache.forEach((g) => array.push(g));
    const e = new MessageEmbed()
        .addField('Servers',array.join("\n"), true)
        .addField('# of servers', client.guilds.cache.size, true)
    message.channel.send(e);
  },
};
