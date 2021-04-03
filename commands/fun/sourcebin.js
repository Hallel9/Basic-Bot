const { create } = require('sourcebin')

module.exports = {
    name: 'sourcebin',
    aliases: ['bin', 'create'],
    description: 'Adds code into a sourcebin link',
    usage: '${prefix}sourcebin <code>',
    category: 'search',
    async run (client, message, args) {
        const content = args.join(' ');
        if (!content) {
            return message.channel.send('Please specify some code');
        }
        
        create([
            {
                name: 'Code',
                content,
                language: 'javascript'
            }
        ]).then((value) => {
            message.channel.send(`Your code has been posted: ${value.url}`);
        })
    }
}