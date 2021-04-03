module.exports = client => {
    console.log(`Logged in as ${client.user.tag}`);
    
        client.user.setPresence({
            activity: {
                name: `<@${client.user.id}>help or *help`,
                type: 'LISTENING',
                url: 'https://twitch.tv/sleeplesskyru'
            }
        });
}
