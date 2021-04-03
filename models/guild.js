const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    prefix: String,
    logChannelID: String,
    members: Number,
    bots: Number,
    region: String,
    owner: String,
    createdAt: String
});

module.exports = mongoose.model('Guild', guildSchema, 'guilds');
