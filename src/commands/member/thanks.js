const discord = require('discord.js');
const fetch = require('node-fetch');

async function SaveToDB(questioner, answerer) {
    var answers = await Stats.findOneAndUpdate({ userID: answerer }, { $inc: { answers: 1 } }, {new: true});
    var questions = await Stats.findOneAndUpdate({ userID: questioner }, { $inc: { questions: 1 } }, {new: true});

}

module.exports = {
    run: async (client, message, args) => {
        var thanksDB = await fetch("https://martinnaj27707.ipage.com/martin/partners/plankto/thanks/?action=fetch").then(res => res.text())
        if (thanksDB.includes('<')) var thanksDB = await fetch("https://martinnaj27707.ipage.com/martin/partners/plankto/thanks/?action=fetch").then(res => res.text())
        thanksDB = JSON.parse(thanksDB);
        if (!(message.mentions.members.first())) {
            var embed = new discord.MessageEmbed()
                .setColor("#ffa530")
                .setDescription(':flag_gb: Please mention who you want to thank! (one person)\n:flag_cz: Prosím označ komu děkuješ! (jednoho člověka)')
            message.channel.send(embed).then(msg => { msg.delete({ timeout: 10000 }).catch((e) => {}) });
            return;
        }
        if (message.mentions.members.first().id == message.author.id) {
            var emoji = await global.findEmoji(message.guild, 'thinkingbeer');
            var embed = new discord.MessageEmbed()
                .setColor("#ffa530")
                .setDescription(':flag_gb: Who thanks themselves? <:' + emoji.name + ':' + emoji.id + '>\n:flag_cz: Kdo děkuje sám sobě? <:' + emoji.name + ':' + emoji.id + '>')
            message.channel.send(embed).then(msg => { msg.delete({ timeout: 10000 }).catch((e) => {}) });
            return;
        }
        if ((thanksDB[message.author.id])&&(thanksDB.length)&&(((thanksDB.slice(-1).pop()['thanked'] == message.mentions.members.first())&&(thanksDB.slice(-1).pop()['time'] > new Date().getTime() / 1000 - 60))||((!(thanksDB.slice(-1).pop()['thanked'] == message.mentions.members.first()))&&(thanksDB.slice(-1).pop()['time'] > new Date().getTime() / 1000 - 5)))) {
            var embed = new discord.MessageEmbed()
                .setColor("#ff3c36")
                .setDescription(':flag_gb: Don\'t thank so often please! :scream:\n:flag_cz: Neděkuj tak často prosím! :scream:')
            message.channel.send(embed).then(msg => { msg.delete({ timeout: 10000 }).catch((e) => {}) });
            return;
        }
        var thanksDB = await fetch("https://martinnaj27707.ipage.com/martin/partners/plankto/thanks/?action=log&data=" + encodeURI(JSON.stringify({ "thanker": message.author.id, "thanking": message.mentions.members.first().id, "message": 'https://discord.com/channels/' + message.guild.id + '/' + message.channel.id + '/' + message.id + '/' }))).then(res => res.text())

        var thanksDB = await fetch("https://martinnaj27707.ipage.com/martin/partners/plankto/thanks/?action=fetch").then(res => res.text())
        thanksDB = JSON.parse(thanksDB);

        var emojis = global.sortByKey(await global.findEmojis(message.guild, 1, ["cz_check", "cz_what"]), "name");

        var embed = new discord.MessageEmbed()
            .setColor("#ffa530")
            .setDescription('<@' + message.mentions.members.first().id + '>** • ' + thanksDB[message.mentions.users.first().id]['was_thanked'].length + ' <:' + emojis[0].name + ':' + emojis[0].id + '>**\n<@' + message.member.id + '>** • ' + thanksDB[message.member.id]['thanked'].length + ' <:' + emojis[1].name + ':' + emojis[1].id + '>**' )
        message.channel.send(embed).then((msg) => { msg.delete({ timeout: 30000 }).catch((e) => {}) });
    },
    descriptionCZ: "Poděkuj",
    descriptionEN: "Thank someone",
    allowedIn: ["guild"],
    czAlias: "děkuji",
    aliases: ['thanks', 'diky', 'dik', 'dekuji']
}
