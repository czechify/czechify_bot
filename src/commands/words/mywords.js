const discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    run: async (client, message, args) => {
        message.delete();
        let userid = message.author.id;
        var allWords = await fetch("https://martinnaj27707.ipage.com/martin/partners/plankto/?action=getUserData&userID=" + userid).then(res => res.text())
        if (allWords == "User not found") {
            message.channel.send("We cannot find you in our database. Sorry.");
            return;
        }
        allWords = JSON.parse(allWords)['words'];
        var words = new Array();
        var wordsEN = new Array();
        allWords.forEach(async function (word, i) {
            var emojis = global.sortByKey(await global.findEmojis(message.guild, 1, ["_beginner", "_intermediate", "_fluent"]), "name");
            if ((word.value <= 3)&&(word.value >= 1)) var dot = emojis[0];
            if ((word.value <= 7)&&(word.value >= 4)) var dot = emojis[1];
            if ((word.value <= 10)&&(word.value >= 8)) var dot = emojis[2];
            words[i] = '<:' + dot.name + ':' + dot.id + '>' + " " + word.wordCzech;
            wordsEN[i] = word.wordEnglish;
            if (i === allWords.length - 1) {
                TheEmbed()
                return;
            }
            return;
        })
        async function TheEmbed() {
            const generateEmbed = start => {
                const current = words.slice(start, start + 10)
                const currentEN = wordsEN.slice(start, start + 10)
                let embed = new discord.MessageEmbed()
                    .setColor("#ffa530")
                    .setTitle(`Slova ${start + 1}-${start + current.length} z ${words.length}`)
                    .addFields(
                        { name: 'Česky', value: current.toString().split(",").join("\n"), inline: true },
                        { name: 'Anglicky', value: currentEN.toString().split(",").join("\n"), inline: true })
                return embed;
            }
            var author = message.author;
            message.channel.send(generateEmbed(0)).then(message => {
                message.delete({ timeout: 120000 });
                if (words.length <= 10) return
                message.react('➡️')
                const collector = message.createReactionCollector(
                    (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
                    { time: 60000 }
                )
                var currentIndex = 0
                collector.on('collect', reaction => {
                    message.reactions.removeAll().then(async () => {
                        reaction.emoji.name === '⬅️' ? currentIndex -= 10 : currentIndex += 10
                        message.edit(generateEmbed(currentIndex))
                        if (currentIndex !== 0) await message.react('⬅️')
                        if (currentIndex + 10 < words.length) message.react('➡️')
                    })
                })
            })
        }
    },
    descriptionCZ: "Tvůj seznam slov",
    descriptionEN: "Your word collection",
    allowedIn: ["guild"],
    czAlias: "slova",
    aliases: ['mywords', 'slova', 'maslova', 'mojeslova']
}
