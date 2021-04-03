module.exports = {
    name: 'dm',
    description: 'Dm a user',
    category: 'fun',
    usage: '<dm <userid>',
    async run(client, message, args) {
        if (!message.member.hasPermission("KICK_MEMBERS", "BAN_MEMBERS")) return message.channel.send("You do not have permission to run this command.");
        const targetMember = message.mentions.members.first();

        if (!targetMember) {
            return message.channel.send('Please provide a user for me to dm.')
        }

        const m = args.join(' ')

        targetMember.send(m)
    }
}