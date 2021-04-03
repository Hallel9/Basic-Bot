const mongoose = require('mongoose');

// This file creates a mongodb database called "guilds"

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
