const { Client, Collection } = require("discord.js");
const fs = require("fs");
const client = new Client({
  partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
  disableMentions: 'everyone'
});
const config = require("./config.json");

client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.mongoose = require("./utils/mongoose");

client.categories = fs.readdirSync("./commands/");

["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error;
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const evt = require(`./events/${file}`);
    let evtName = file.split(".")[0];
    console.log(`Loaded event '${evtName}'`);
    client.on(evtName, evt.bind(null, client));
  });
});

client.mongoose.init();
client.login(config.token);

const { AntiRaid } = require("discord-antiraid");
async () => {
  let antiRaid = new AntiRaid(client, {
    rateLimit: 3,
    time: 10000,
    ban: true,
    kick: false,
    exemptMembers: [],
    exemptRoles: [],
    exemptEvent: [],
    reason: "Punis par l'antiRaid",
  });
  let member = client.guilds.cache.get("").members.cache.get(""),
    event = "guildBanAdd";

  let obj = await antiRaid.search(member, event);
  console.log(obj);
  /*
    Output:
    {
      id: 'XXXXXXXXXXXXXXXXXX',
      guild: 'XXXXXXXXXXXXXXXXXX',
      event: 'guildBanAdd',
      startedAt: XXXXXXXXXXXXX,
      rate: 1
    }
    */

  let cooldown = antiRaid.cooldown;
  console.log(cooldown);

  await antiRaid.addCase(member, event, obj, Date.now());

  await antiRaid.punish(member);

  await antiRaid.checkExempt(member);

  let check = await antiRaid.checkCase(member, event, obj);
  console.log(check);
  /*
    Output:
        true/false
    */
};
