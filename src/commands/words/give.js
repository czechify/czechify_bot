const discord = require('discord.js');
const fetch = require('node-fetch');

const gotRecently = new Set();
var startTimeMS = 0;  // EPOCH Time of event count started
var timerStep = 1200000;   // Time beetwen calls

module.exports = {
    run: async (client, message, args) => {
        if (gotRecently.has(message.author.id)) {
            remainingTimeMS = await timeGet();
            var remainingTimeMIN = Math.floor(remainingTimeMS / 60000);
            function timeGet() {
                return timerStep - ((new Date()).getTime() - startTimeMS);
            }
            let embed = new discord.MessageEmbed()
                .setColor("#ff3c36")
                .addFields(
                    { name: ':flag_gb:\u200B', value: `Next word in **${remainingTimeMIN}** minutes!` },
                    { name: ':flag_cz:\u200B', value: `Nové slovo za **${remainingTimeMIN}** minut!` }
                ).setThumbnail("https://i.imgur.com/5UxthxL.png");
            message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
            message.delete();
            return;
        } else {
            gotRecently.add(message.author.id)
            startTimer();
            function startTimer() {
                startTimeMS = (new Date()).getTime();
                setTimeout(() => {
                    gotRecently.delete(message.author.id);
                }, timerStep);
            }
            let userid = message.author.id;

            var response = await fetch("https://najemi.cz/partners/plankto/?action=addToUser&userID=" + userid + "&random&minmax&min=1&max=5").then(res => res.text())
            if (response.includes("Added word: ")) {
                var wordID = response.split("Added word: ")[1];
                var response = await fetch("https://www.najemi.cz/partners/plankto/?action=viewAllWords").then(res => res.text())
                response = JSON.parse(response);
                var word = response[wordID];

                console.log(word)

                let embed = new discord.MessageEmbed()
                    .setColor("#59ea00")
                    .setFooter(message.member.displayName, message.member.user.displayAvatarURL())
                    .setTitle("Máš nové slovo")
                    .addFields(
                        { name: '\u200B', value: `:flag_cz: Teď máš slovo **${word.wordCzech}**!\n:flag_gb: You now have the word **${word.wordEnglish}**!\r\n\u200B` },
                    )
                message.channel.send(embed)
            }else if (response == "User has all applicable words"){
                let embed = new discord.MessageEmbed()
                    .setColor("#59ea00")
                    .setFooter(message.member.displayName, message.member.user.displayAvatarURL())
                    .setTitle("Máš nové slovo")
                    .addFields(
                        { name: '\u200B', value: `:flag_cz: Už máš **všechna** slova!\n:flag_gb: You already have **all** the words!\r\n\u200B` },
                    )
                message.channel.send(embed);
            } else {
                msg = message.channel.send(response)
            }
            message.delete();

        }
    },
    aliases: ['giveword', 'newword', 'noveslovo', 'slovo', 'slovodej', 'word']
}
