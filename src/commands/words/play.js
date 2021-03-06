const discord = require('discord.js');
const fetch = require('node-fetch');

var playedRecently = {};
var startTimeMS = 0;
var timerStep = 1800000;
time = 60000;

function startTimer(playedRecently, timerStep, message) {
    startTimeMS = (new Date()).getTime();
    setTimeout(() => { playedRecently[message.author.id] = false; }, timerStep );
}

function timeGet() { return timerStep - ((new Date()).getTime() - startTimeMS); }

async function Start(count, allWords, theChannel, timerID, oldMsg, message, ReactionMessage) {
    let theWord = allWords[Math.floor(Math.random() * allWords.length)];
    ansCount = 0;
    maxQuestionAmt = count * 2;
    questionAmt = 0;
    let embed = new discord.MessageEmbed()
        .setTitle('Translate to Czech')
        .setFooter(ansCount + ' | Answers: 0 (10 for a new word)', "https://i.imgur.com/XerxQlo.png")
        .setDescription(theWord.wordEnglish)
        .setColor('#ffa530');
    await theChannel.send('<@' + message.author.id + '>').then((msg) => {msg.delete()})
    let infoMsg = await theChannel.send(embed);
    CheckAnswer(allWords, theWord, infoMsg, count, theChannel, ansCount, timerID, oldMsg, message, ReactionMessage)
    setTimeout(async function () {
        infoMsg.delete();
        let embed = new discord.MessageEmbed()
            .setTitle('Good game!')
            .setDescription('⏰ Time limit hit!\n\n**__You got:__**\n**' + ansCount + '** answers\n**' + Math.floor(ansCount/10) + '** new words!')
            .setColor('#ffa530')
        theChannel.send(embed);
        setTimeout(function () { theChannel.delete(); }, 20000);
    }, 600000);
}

async function EditMessage(allWords, infoMsg, count, theChannel, ansCount, timerID, oldMsg, message, ReactionMessage) {
    let theWord = allWords[Math.floor(Math.random() * allWords.length)];
    let embed = new discord.MessageEmbed()
        .setTitle('Translate to Czech')
        .setFooter(ansCount + ' | Answers: ' + ansCount + ' (' + (10 - ansCount) + ' for a new word))', "https://i.imgur.com/XerxQlo.png")
        .setDescription(theWord.wordEnglish)
        .setColor('#ffa530')
    infoMsg.edit(embed)
    CheckAnswer(allWords, theWord, infoMsg, count, theChannel, ansCount, timerID, oldMsg, message, ReactionMessage)
}

async function CheckAnswer(allWords, theWord, infoMsg, count, theChannel, ansCount, timer, oldMsg, message, ReactionMessage) {
    const collector = new discord.MessageCollector(theChannel, m => m.author.id === message.author.id, { time: 600000 });
    collector.on('collect', async hisMsg => {
        if (hisMsg.content.toLowerCase() == theWord.wordCzech.toLowerCase()) {
            ansCount++;
            questionAmt++;
            collector.stop();
            hisMsg.delete();
            if (typeof timer !== 'undefined') clearTimeout(timer);
            let timerID = setTimeout(async function () {
                infoMsg.delete();
                if (oldMsg !== undefined) oldMsg.delete();
                let embed = new discord.MessageEmbed()
                    .setTitle('Good game!')
                    .setDescription('⏰ Too slow!\n\n**__You got:__**\n**' + ansCount + '** answers\n**'+ Math.floor(ansCount/10) + '** new words!')
                    .setColor('#ffa530');
                theChannel.send(embed);
                await fetch("https://najemi.cz/czechifyapi/words/?action=addToUser&userID=" + userid + "&random&minmax&min=1&max=5").then(res => res.text())
                setTimeout(function () {
                    ReactionMessage.edit();
                    theChannel.delete();
                }, 20000);
                return;
            }, 30000);
            if (questionAmt == maxQuestionAmt) {
                if (oldMsg !== undefined) oldMsg.delete();
                infoMsg.delete();
                var cz_check = await global.findEmoji(infoMsg.guild, 'cz_check');
                let embed = new discord.MessageEmbed()
                    .setTitle('Good game!')
                    .setDescription('<:' + cz_check['name'] + ':' + cz_check['id'] + '> All the words were repeated!\n\n**__You got:__**\n**' + ansCount + '** answers\n**'+ Math.floor(ansCount/10) + '** new words!')
                    .setColor('#ffa530')
                theChannel.send(embed)
                setTimeout(function () { theChannel.delete(); }, 20000);
                return;
            }
            if (oldMsg !== undefined) {
                var cz_check = await global.findEmoji(oldMsg.guild, 'cz_check');
                oldMsg.edit('<:' + cz_check['name'] + ':' + cz_check['id'] + '> ' + theWord.wordCzech);
                EditMessage(allWords, infoMsg, count, theChannel, ansCount, timerID, oldMsg, message, ReactionMessage);
            } else {
                var cz_check = await global.findEmoji(theChannel.guild, 'cz_check');
                let newMsg = await theChannel.send('<:' + cz_check['name'] + ':' + cz_check['id'] + '> ' + theWord.wordCzech).then((msg) => {msg.delete({timeout:5000})});
                EditMessage(allWords, infoMsg, count, theChannel, ansCount, timerID, newMsg, message, ReactionMessage);
                return;
            }
        }else {
            collector.stop()
            if (oldMsg !== undefined) oldMsg.delete();
            infoMsg.delete();
            var cz_exclamation = await global.findEmoji(infoMsg.guild, 'cz_exclamation');
            var cz_check = await global.findEmoji(infoMsg.guild, 'cz_check');
            let embed = new discord.MessageEmbed()
                .setTitle('Good game!')
                .setDescription('🇬🇧 ' + theWord.wordEnglish + '\n<:' + cz_exclamation['name'] + ':' + cz_exclamation['id'] + '> ' + hisMsg.content + ' => ' + theWord.wordCzech + ' <:' + cz_check['name'] + ':' + cz_check['id'] + '>\n\n**__You got:__**\n**' + ansCount + '** answers\n**'+ Math.floor(ansCount/10) + '** new words!')
                .setColor('#ffa530');
            theChannel.send(embed);
            setTimeout(function () {
                let embed = new discord.MessageEmbed()
                    .setTitle('Super!')
                    .setDescription('Hra uživatele ' + username + ' skončila')
                    .setThumbnail("https://i.imgur.com/Nbgm8qo.png")
                    .setColor('#ffa530');
                ReactionMessage.edit(embed);
            }, 1000);
            return;
        }
    })
}

module.exports = {
    run: async (client, message, args) => {
        message.delete();
        if (playedRecently[message.author.id]) {
            remainingTimeMS = await timeGet();
            var remainingTimeMIN = Math.floor(remainingTimeMS / 60000);
            let embed = new discord.MessageEmbed()
                .setColor("#ff3c36")
                .addFields( { name: ':flag_gb:\u200B', value: 'You can play in **' + remainingTimeMIN + '** minutes!' }, { name: ':flag_cz:\u200B', value: 'Můžeš hrát za **' + remainingTimeMIN + '** minut!' })
                .setThumbnail("https://i.imgur.com/5UxthxL.png");
            message.channel.send(embed).then(msg => { msg.delete({ timeout: 5000 }).catch((e) => {}) });
            return;
        }else {
            playedRecently[message.author.id] = true;
            startTimer(playedRecently, timerStep, message);
            username = message.member.displayName;
            userid = message.author.id;
            var userData = await fetch("https://najemi.cz/czechifyapi/words/?action=getUserData&userID=" + userid).then(res => res.text())
            userData = JSON.parse(userData);
            var allWords = userData['words'];
            var userWordCount = userData['words'].length;
            if (userWordCount < 10) {
                let embed = new discord.MessageEmbed()
                    .setTitle('Nemůžeš!')
                    .setDescription('Potřebuješ alespoň **10** slov! Teď máš **' + userWordCount + '**!')
                    .setThumbnail("https://i.imgur.com/aqyOSdx.png")
                    .setColor('#ffa530');
                message.channel.send(embed)
                return;
            }
            let embed = new discord.MessageEmbed()
                .setTitle('Začít?')
                .setDescription('Chceš teda hrát?')
                .setThumbnail("https://i.imgur.com/pYq7eBq.png")
                .setColor('#ffa530');
            let ReactionMessage = await message.channel.send(embed)
            ReactionMessage.react("✅");
            ReactionMessage.react("❌");
            var learningCZID = await global.findARole(message.guild, 0, "Learning Czech");
            learningCZID = learningCZID.id
            const YesNofilter = (reaction, user) => { return ["✅", "❌"].includes(reaction.emoji.name) && user.id === message.author.id; };
            const tradeCollector = ReactionMessage.createReactionCollector(YesNofilter, { max: 1, time: time });
            tradeCollector.on('collect', async (reaction, reactionCollector) => {
                if (reaction.emoji.name == '✅') {
                    let timerID;
                    let oldMsg;
                    var category = client.channels.cache.find(role => role.name === "Current Games (/play)");
                    let theChannel = await message.guild.channels.create(username, {
                        type: 'text',
                        parent: category,
                        permissionOverwrites: [
                            { id: message.guild.id, deny: ['SEND_MESSAGES'], },
                            { id: message.author.id, allow: ['SEND_MESSAGES'], },
                        ],
                    });
                    let embedder = new discord.MessageEmbed()
                        .setTitle('Hraj!')
                        .setDescription('Začala ti hra v ' + theChannel + '!')
                        .setColor('#ffa530');
                    ReactionMessage.reactions.removeAll().then(async () => {
                        let playingMessage = await ReactionMessage.edit(embedder)
                        Start(0, allWords, theChannel, timerID, oldMsg, message, ReactionMessage);
                    })
                }else if(reaction.emoji.name == '❌'){
                    ReactionMessage.reactions.removeAll();
                    let embed = new discord.MessageEmbed()
                        .setTitle('Tak nic')
                        .setDescription('Jak chceš!')
                        .setThumbnail("https://i.imgur.com/5Uf1EOl.png")
                        .setColor('#ffa530');
                    ReactionMessage.edit(embed).then((msg) => { msg.delete({timeout:10000}) })
                }
            });
        }
    },
    descriptionCZ: "Hrát hru se slovy!",
    descriptionEN: "Play the word game!",
    allowedIn: ["guild"],
    czAlias: "hrát",
    aliases: ['play', 'hrat', 'game', 'wordgame']
}
