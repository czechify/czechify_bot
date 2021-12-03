const discord = require('discord.js');
const fetch = require('node-fetch')

async function Reaction(msg, emojis) {
    emojis.forEach((item) => { msg.react(item); })
}
async function sendToChannel(message, txt) {
    return txt
}

async function trade(minRemoval, maxRemoval, quantityToRemove, minGiving, maxGiving, difficultyRemoving, difficultyGiving, colourEmojis, gif, message) {
    var allWords = JSON.parse(await fetch("https://martinnaj27707.ipage.com/martin/partners/plankto/?action=viewAllWords").then(res => res.text()))
    var userData = JSON.parse(await fetch("https://martinnaj27707.ipage.com/martin/partners/plankto/?action=getUserData&userID=" + message.author.id).then(res => res.text()))['words']

    //These next few lines check to see if they already have all of the type of word they're trying to get
    var canBeGiven = [];
    Object.keys(allWords).forEach((item) => { if ((allWords[item]['value'] <= maxGiving)&&(allWords[item]['value'] >= minGiving)) canBeGiven.push(allWords[item]); })
    var cannotBeGiven = [];
    userData.forEach((item) => { if ((item['value'] <= maxGiving)&&(item['value'] >= minGiving)) cannotBeGiven.push(item); })
    if (cannotBeGiven.length >= canBeGiven.length) return "You already have all of the " + difficultyGiving + " words";

    //These next few lines check ot see if they have enough words to complete the task
    removableWords = [];
    userData.forEach((item) => { if ((item['value'] <= maxRemoval)&&(item['value'] >= minRemoval)) removableWords.push(item); })
    if (removableWords.length < 5) return "You do not have enough words to complete this action";

    var wordIDsRemoved = [];
    while (wordIDsRemoved.length < quantityToRemove) {
        var response = await fetch("https://najemi.cz/partners/plankto/?action=removeFromUser&random&minmax&minValue=" + minRemoval.toString() + "&maxValue=" + maxRemoval.toString() + "&userID=" + message.author.id).then(res => res.text())
        if ((response == "User doesn't exist")||(response == "User doesn't have any applicable words")) return "You do not have enough words to complete this action"; else if (response.includes("Removed word: ")) wordIDsRemoved.push(response.replace("Removed word: ", ""))
    }

    var response = await fetch("https://najemi.cz/partners/plankto/?action=addToUser&random&minmax&minValue=" + minGiving.toString() + "&maxValue=" + maxGiving.toString() + "&userID=" + message.author.id).then(res => res.text())
    if ((response == 'User has all applicable words')||(response == 'User already has word')||(response == 'WordID does not exist')||(response == 'You missed something')) var response = await fetch("https://najemi.cz/partners/plankto/?action=addToUser&random&minmax&minValue=" + minGiving.toString() + "&maxValue=" + maxGiving.toString() + "&userID=" + message.author.id).then(res => res.text())
    if ((response == 'User has all applicable words')||(response == 'User already has word')||(response == 'WordID does not exist')||(response == 'You missed something')) return "An unexpected error occured";

    if (response.includes('Added word: ')) {
        var newWordID = response.replace('Added word: ', '');
        if (typeof(allWords[newWordID]) == "undefined") return "Your new word has been added however we cannot seem to find the word in the database. find it out yourself, im lazy";
        return allWords[newWordID];
    }else{
        return "An unexpected error occured";
    }
}
async function exitMarket(reactionMessage) {
    reactionMessage.reactions.removeAll();
    let embed = new discord.MessageEmbed()
        .setColor("#ffa530")
        .setTitle('Zrušeno')
        .setThumbnail("https://i.imgur.com/e24a3hK.png");
    reactionMessage.edit(embed)
    setTimeout(() => { reactionMessage.delete() }, 5000);
}

async function enterMarket(reactionMessage, emojis, message) {
    let embed = new discord.MessageEmbed()
        .setColor("#ffa530")
        .setTitle("Market")
        .setDescription('\u200B\n' + emojis[1] + ' Get intermediate words\n\n' + emojis[2] + ' Get fluent words')
        // .addFields(
        //     { name: `${intermediateEmoji}`, value: `Get intermediate words`, inline: true },
        //     { name: `${fluentEmoji}`, value: `Get advanced words`, inline: true }
        // )

    if (reactionMessage) reactionMessage.edit(embed); else reactionMessage = await message.channel.send(embed);
    reactionMessage.reactions.removeAll();
    Reaction(reactionMessage, [emojis[1], emojis[2]]);

    const filter = (reaction, user) => { return ((["_intermediate", "_fluent", "↩️"].includes(reaction.emoji.name))&&(user.id == message.author.id)) };
    const collector = reactionMessage.createReactionCollector(filter, { max: 1, time: 30000 });
    collector.on('collect', async (reaction, reactionCollector) => {
        if (reaction.emoji.name == "_intermediate") { minRemoval = 1; maxRemoval = 3; minGiving = 4; maxGiving = 7; difficultyRemoving = "beginner"; difficultyGiving = "intermediate"; } else if (reaction.emoji.name == "_fluent") { minRemoval = 4; maxRemoval = 7; minGiving = 8; maxGiving = 10; difficultyRemoving = "intermediate"; difficultyGiving = "fluent"; } else { exitMarket(reactionMessage); }
        var wordData = await trade(minRemoval, maxRemoval, 5, minGiving, maxGiving, difficultyRemoving, difficultyGiving, emojis, "This is meant to be the gif", message);
        if (typeof(wordData) == "object") {
            var word = wordData
            let embed = new discord.MessageEmbed()
                .setColor("#59ea00")
                .setFooter(message.member.displayName, message.member.user.displayAvatarURL())
                .setTitle("Máš nové slovo")
                .addFields(
                    { name: '\u200B', value: ':flag_cz: Teď máš slovo **' + word['wordCzech'] + '**!\n:flag_gb: You now have the word **' + word['wordEnglish'] + '**!\r\n\u200B' },
                )
            reactionMessage.edit(embed)
            setTimeout(() => { reactionMessage.delete() }, 10000)
            return;
        }else{
            if (wordData == "You already have all of the " + difficultyGiving + " words") {
                if (difficultyGiving == "fluent") translation = "plynulá slova"; else if (difficultyGiving == "intermediate") translation = "mezilehlá slova";
                embed = new discord.MessageEmbed()
                    .setColor("#ff0000")
                    .setFooter(message.member.displayName, message.member.user.displayAvatarURL())
                    .setTitle("Oops")
                    .addFields(
                        { name: '\u200B', value: ':flag_cz: Už máš všechna ' + translation + '!\n:flag_gb: You already have all of the ' + difficultyGiving + ' words!\r\n\u200B' },
                    )
            }else if (wordData == "You do not have enough words to complete this action") {
                embed = new discord.MessageEmbed()
                    .setColor("#ff0000")
                    .setFooter(message.member.displayName, message.member.user.displayAvatarURL())
                    .setTitle("Oops")
                    .addFields(
                        { name: '\u200B', value: ':flag_cz: Nemáš dost slov na to, abys vstoupil na trh!\n:flag_gb: You do not have enough words to enter the market!\r\n\u200B' },
                    )
            }else if (wordData == "An unexpected error occured") {
                embed = new discord.MessageEmbed()
                    .setColor("#ff0000")
                    .setFooter(message.member.displayName, message.member.user.displayAvatarURL())
                    .setTitle("Oops")
                    .addFields(
                        { name: '\u200B', value: ':flag_cz: Vyskytla se neočekávaná chyba!\n:flag_gb: An unexpected error occured!\r\n\u200B' },
                    )
            }else {
                embed = new discord.MessageEmbed()
                    .setColor("#ff0000")
                    .setFooter(message.member.displayName, message.member.user.displayAvatarURL())
                    .setTitle("Oops")
                    .addFields(
                        { name: '\u200B', value: wordData },
                    )
            }
            reactionMessage.reactions.removeAll();
            reactionMessage.edit(embed)
            setTimeout(() => { reactionMessage.delete() }, 10000)
            return;
        }
    })
}

module.exports = {
    run: async (client, message, args) => {
        message.delete();
        var allWords = await fetch("https://najemi.cz/partners/plankto/?action=getUserData&userID=" + message.author.id).then(res => res.text())
        if (allWords == "User not found") return "Sorry, we cannot find you in our database.";
        allWords = JSON.parse(allWords)['words'];

        const plusEmoji = message.guild.emojis.cache.find(emoji => emoji.name == "cz_plus");
        const checkEmooji = message.guild.emojis.cache.find(emoji => emoji.name == "cz_check");
        const beginnerEmoji = message.guild.emojis.cache.find(emoji => emoji.name == "_beginnner");
        const intermediateEmoji = message.guild.emojis.cache.find(emoji => emoji.name == "_intermediate");
        const fluentEmoji = message.guild.emojis.cache.find(emoji => emoji.name == "_fluent");
        dotBEG = "<:_beginnner:694924576827899996>";
        dotADV = "<:_advanced:694924577129889804>";
        dotFLU = "<:_fluent:694924578253701120>";
        gif = "https://i.imgur.com/RZACo5l.gif"
        gifGOLD = "https://i.imgur.com/yjvkk37.gif"

        enterMarket(undefined, [beginnerEmoji, intermediateEmoji, fluentEmoji], message);
    },
    aliases: ['shop', 'obchod', 'koupit', 'trh']
}