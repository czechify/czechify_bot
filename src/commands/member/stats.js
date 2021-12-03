const discord = require('discord.js');
const fetch = require('node-fetch');

function convertHMS(value) {
    const sec = parseInt(value, 10);
    var hours = Math.floor(value / 3600);
    minutes = Math.floor((sec - hours * 3600) / 60);
    if (hours < 10) hours   = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    return hours + ':' + minutes;
}

function DHMS(s) {
    if (s >= 86400) var d = (s - (s % 86400)) / 86400;
    s = s % 86400;
    if (s >= 3600) var h = (s - (s % 3600)) / 3600;
    s = s % 3600;
    if (s >= 60) var m = (s - (s % 60)) / 60;
    s = s % 60;
    return [d || 0, h || 0, m || 0, s || 0];
}

function cParse1(s) {
    var d = DHMS(s);
    if (d[1].toString().length == 1) d[1] = "0" + d[1].toString()
    if (d[2].toString().length == 1) d[2] = "0" + d[2].toString()
    if (d[3].toString().length == 1) d[3] = "0" + d[3].toString()
    for (i = 0; i < 2; i++) if ((d[0] == "0")||(d[0] == "00")||(d[0] == 0)) d.shift();
    return d.join(":")
}

module.exports = {
    run: async (client, message, args) => {
        message.delete()

        if (message.author.bot) return;

        fields = [];

        if ((message.mentions.members.first())&&(!(message.mentions.members.first().user.bot))) {
            var embedTitle = '__' + message.mentions.members.first().displayName + '__';
            var embedThumbnail = message.mentions.members.first().user.displayAvatarURL();

            var userData = await fetch("https://martinnaj27707.ipage.com/martin/partners/plankto/?action=getUserData&userID=" + message.mentions.members.first().id).then(res => res.text())
            if (userData == 'User not found') userData = false; else userData = JSON.parse(userData);

            var thanksData = JSON.parse(await fetch("https://martinnaj27707.ipage.com/martin/partners/plankto/thanks/?action=fetch").then(res => res.text()))
            if (thanksData[message.mentions.members.first().id]) thanksData = thanksData[message.mentions.members.first().id]; else thanksData = false;

            var moreData = JSON.parse(await fetch("https://martinnaj27707.ipage.com/martin/partners/plankto/stats/?action=fetch").then(res => res.text()))
            if (moreData['users'][message.mentions.members.first().id]) moreData = moreData['users'][message.mentions.members.first().id]; else moreData = false;

            //var channel = await global.findAChannel(0, message.guild, "general");

            var emojis = global.sortByKey(await global.findEmojis(message.guild, 1, ["cz_check", "cz_what"]), "name");

            var { joinedTimestamp, lastMessageID, lastMessageChannelID } = message.mentions.members.first();
            var { bot } = message.mentions.members.first().user;
        }else {
            var embedTitle = '__' + message.member.displayName + '__';
            var embedThumbnail = message.author.displayAvatarURL();

            var userData = await fetch("https://martinnaj27707.ipage.com/martin/partners/plankto/?action=getUserData&userID=" + message.member.id).then(res => res.text())
            if (userData == 'User not found') userData = false; else userData = JSON.parse(userData);

            var thanksData = JSON.parse(await fetch("https://martinnaj27707.ipage.com/martin/partners/plankto/thanks/?action=fetch").then(res => res.text()))
            if (thanksData[message.author.id]) thanksData = thanksData[message.author.id]; else thanksData = false;

            var moreData = JSON.parse(await fetch("https://martinnaj27707.ipage.com/martin/partners/plankto/stats/?action=fetch").then(res => res.text()))
            if (moreData['users'][message.author.id]) moreData = moreData['users'][message.author.id]; else moreData = false;

            //var channel = await global.findAChannel(0, message.guild, "general");

            var emojis = global.sortByKey(await global.findEmojis(message.guild, 1, ["cz_check", "cz_plus", "cz_what"]), "name");

            //var { joinedTimestamp } = message.member;
        }


        if (userData) {
            if (userData['words'].length == 1) var s = 'slovo'; else if ((userData['words'].length > 1)&&(userData['words'].length < 5)) var s = 'slova'; else var s = 'slov';
            if (userData['score'] == 1) var d = 'bod'; else if ((userData['score'] > 1)&&(userData['words'] < 5)) var d = 'body'; else var d = 'bodů';
            fields.push({name: '__Slovíčka__ :books:', value: userData['words'].length + ' ' + s + '\n' + userData['score'] + ' ' + d});
        }else fields.push({name: '__Slovíčka__ :books:', value: '**/slovo**'});

        //<:' + emojis[0].name + ':' + emojis[0].id + '>

        //if (thanksData) fields.push({name: '__Učení__ :exploding_head:', value: '<:' + emojis[2].name + ':' + emojis[2].id + '> ' + thanksData['thanked'].length + ' \n<:' + emojis[0].name + ':' + emojis[0].id + '> ' + thanksData['was_thanked'].length + '\n\u200B\n\u200B'}); else fields.push({name: ':exploding_head: Učení', value: '<:' + emojis[2].name + ':' + emojis[2].id + '> 0 \n<:' + emojis[0].name + ':' + emojis[0].id + '> 0 \n\u200B\n\u200B'});
        if (thanksData) fields.push({name: '__Učení__ :exploding_head:', value: 'Poděkoval/a ' + thanksData['thanked'].length + ' krát\nPomohl/a ' + thanksData['was_thanked'].length + ' krát'}); else fields.push({name: '__Učení__ :exploding_head:', value: 'Poděkoval/a 0 krát\nPomohl/a 0 krát'});

        if (moreData) {
            var data = [];
            var sorted = [];
            var sorted1 = Object.values(moreData['withOthers']).sort(function(a,b) { return a - b; }).reverse();
            var sorted2 = [];
            Object.keys(moreData['withOthers']).forEach((k) => { sorted2[sorted1.indexOf(moreData['withOthers'][k])] = k; })
            m = 0;
            Object.keys(sorted1).forEach((k) => {
                if (m < 3) {
                    m++;
                    data.push(m.toString() + '. <@' + sorted2[k] + '> (' + cParse1(sorted1[k]) + ')');
                }
            })
            if (!(data.length)) data = "Ještě nemluvil/a";
            if (typeof data == 'object') data = data.join('\n');

            fields.push({name: '__Mluvení__ :speaker:', value: 'Čas praktiky: ' + cParse1(moreData['total'])})
            fields.push({name: '__Top kamarádi__ :busts_in_silhouette:', value: data})
        }

        fields.forEach((field) => {
            var index = fields.indexOf(field);
            if (!(index + 1 == fields.length)) fields[index]['value'] = fields[index]['value'] + '\n\u200B\n\u200B';
        })

        var embed = new discord.MessageEmbed()
            .setColor("#ffa530")
            .setTitle(embedTitle)
            .addFields(fields)
            .setThumbnail(embedThumbnail);
        message.channel.send(embed).then((msg) => { msg.delete({ timeout: 30000 }).catch((e) => {}) });
    },
    descriptionCZ: "Informace o tvé aktivitě na serveru",
    descriptionEN: "Your activity on the server",
    allowedIn: ["guild", "dm"],
    czAlias: "omně",
    aliases: ['stats', 'omne', 'aboutme', 'profile']
}
