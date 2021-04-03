const mongoose = require("mongoose");
const Guild = require("../models/guild");
const config = require("../config.json");
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const db = require('quick.db')
module.exports = async (client, message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  let user = db.get(`blacklist_${message.author.id}`);
  if(user == true) return;

  const settings = await Guild.findOne(
    {
      guildID: message.guild.id,
    },
    (err, guild) => {
      if (err) console.error(err);
      if (!guild) {
        const newGuild = new Guild({
          _id: mongoose.Types.ObjectId(),
          guildID: message.guild.id,
          guildName: message.guild.name,
          prefix: config.prefix,
          logChannelID: null,
          members: message.guild.members.cache.filter((member) => !member.user.bot).size,
          bots: message.guild.members.cache.filter((member) => member.user.bot).size,
          region: message.guild.region,
          owner: message.guild.owner.user.tag,
          createdAt: message.guild.createdAt
        });

        newGuild
          .save()
          .then((result) => console.log(result))
          .catch((err) => console.error(err));

        return message.channel
          .send(
            "This server was not in our database! We have now added and you should be able to use bot commands."
          )
          .then((m) => m.delete({ timeout: 10000 }));
      }
    }
  );

  try {
    const prefix = settings.prefix;

    if (message.content === `<@!${client.user.id}>`) {
      return message.channel.send(`My prefix for this guild is **${prefix}** .`);
    }

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
	if (!prefixRegex.test(message.content)) return;

	const [, matchedPrefix] = message.content.match(prefixRegex);

    if (!message.member)
      message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));


    if (command.ownerOnly && message.author.id !== config.owners) return message.channel.send('This is an owner only command.');

    if (command) command.run(client, message, args);
  } catch (e) {
    console.log(e);
  }
};
