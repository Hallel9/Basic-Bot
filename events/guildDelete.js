const mongoose = require('mongoose');
const Guild = require('../models/guild');

// When the bot leaves a guild that's already added to the database, the guild will be deleted from it.

module.exports = async (client, guild) => {
    Guild.findOneAndDelete({
        guildID: guild.id
    }, (err, res) => {
        if(err) console.error(err)
        console.log('I have been removed from a server!');
    });
};
