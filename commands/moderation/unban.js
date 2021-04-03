const User = require('../../models/user')
module.exports = {
    name: 'unban',
    category: 'moderation',
    description: 'Unbans a user.',
    usage: `unban <userid>`,
    run: async (client, message, args) => {
        const member = args[0]


        if (!member) {
            return message.channel.send('Please mention a valid user that was not already banned.')
        }

        message.guild.members.unban(member)
        User.findOneAndDelete({
            guildID: message.guild.id,
                    userID: member.id,
                    muteCount: 0,
                    warnCount: 0,
                    kickCount: 0,
                    banCount: 1
        })
        return message.channel.send(`That user has been unbanned!`)
    }
}