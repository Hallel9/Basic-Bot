const { MessageEmbed } = require('discord.js')
const answers = [
    "As I see it, yes.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Yes. There you go. I told you now go away.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "No.",
    "Yes.",
    "Isn't it obvious?",
    "My reply is no.",
    "Absolutely not.",
    "I'd rather eat dirt than answer that question."

]




module.exports = {
    name: '8ball',
    category: 'fun',
    description: 'Sends an answer',
    usage: `8ball <question>`,
    run: async (client, message, args) => {
        const question = args.join(' ')
        if (!question) return message.channel.send('Ask a question');

        let response =
        answers[Math.floor(Math.random() * answers.length - 1)];
      let Embed = new MessageEmbed()
        .setTitle(`8Ball!`)
        .setDescription(`Your question: ${question}\nMy reply: ${response}`)
        .setColor(`RANDOM`);
      message.channel.send(Embed);
    }
}
