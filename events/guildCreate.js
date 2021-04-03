const mongoose = require('mongoose');
const Guild = require('../models/guild');
const config = require('../config.json')

// When the bot joins a new server, the server will be added to the database with the options down below.

module.exports = async (client, guild) => {
    guild = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: guild.id,
        guildName: guild.name,
        prefix: config.prefix,
        members: guild.members.cache.filter(member => !member.user.bot).size,
        bots: guild.members.cache.filter(member => member.user.bot).size,
        region: guild.region,
        owner: guild.owner.user.tag,
        createdAt: guild.createdAt
    });

    guild.save()
    .catch(err => console.error(err));

    console.log('I have joined a new server!');
};
