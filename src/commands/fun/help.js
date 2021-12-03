categoryAliases = {"fun": `Fun :smile:`, "member": `Useful stuff :tools:`, "mod": `Moderator commands :hammer:`, "roles": `Roles :heart:`, "words": `Word Game :pencil:`}
categoryAliasesCZ = {"fun": `Zábava :smile:`, "member": `Užitečné věci :tools:`, "mod": `Přikázy pro moderátory :hammer:`, "roles": `Role :heart:`, "words": `Hra se slovíčky :pencil:`}
const discord = require('discord.js');

async function Czech(message, client) {
    categories = {}
    Object.keys(client.commands).forEach((key) => {
        var obj = client.commands[key];
        if (!(global.hiddenCommands[obj[5]])) {
            if (!(categories[obj[2]])) categories[obj[2]] = []
            cannotDo = false;
            categories[obj[2]].forEach((item) => { if (item[5] == obj[5]) cannotDo = true; })
            if (!(cannotDo)) categories[obj[2]].push(obj)
        }
    })
    Object.keys(categories).forEach((key) =>{ if (global.hiddenCategories[key]) delete categories[key]; })
    var fields = [];
    Object.keys(categories).forEach((category) => {
        var oldOBJ = categories[category];
        var obj = {};
        if (categoryAliasesCZ[category]) {
            obj['name'] = categoryAliasesCZ[category];
            var txt = '';
            oldOBJ.forEach((command) => {  if ((command[1])&&(command[1].length)&&(command[3])&&(command[4])&&(command[6])) { txt = txt + "**/" + command[6] + "** (" + command[1].join(", ") + ") - " + command[3]; if (!(oldOBJ.indexOf(command) == oldOBJ.length - 1)) txt = txt + "\n"; } })
            obj['value'] = txt;
            if ((obj['name'])&&(obj['value'])) fields.push(obj);
        }
    })
    var fields1 = [];
    fields.forEach((field) => {
        fields1.push(field);
        if (!(fields.indexOf(field) == fields.length - 1)) fields1.push({ name: '\u200B', value: '\u200B' })
    })
    var embedCZ = new discord.MessageEmbed()
        .setColor('#ffa530')
        .setTitle(`Příkazy na serveru`)
        .setDescription(`__Co umí náš bot?__\n\u200b`)
        .addFields(fields1);
    var msgcz = await message.channel.send(embedCZ);
    msgcz.react("🇬🇧");
    const time = 500000; //amount of time to collect for in milliseconds
    const filter = (reaction, user) => { return ["🇬🇧"].includes(reaction.emoji.name) && user.id === message.author.id; }
    const collector = msgcz.createReactionCollector(filter, { time: time });
    collector.on('collect', async (reaction, reactionCollector) => {
        if (reaction = '🇬🇧') {
            English(message, client);
            msgcz.delete();
        }
    });
    setTimeout(function() { if (!(msgcz.deleted)) msgcz.delete(); }, 60000)
};

async function English(message, client) {
    categories = {}
    Object.keys(client.commands).forEach((key) => {
        var obj = client.commands[key];
        if (!(global.hiddenCommands[obj[5]])) {
            if (!(categories[obj[2]])) categories[obj[2]] = []
            cannotDo = false;
            categories[obj[2]].forEach((item) => { if (item[5] == obj[5]) cannotDo = true; })
            if (!(cannotDo)) categories[obj[2]].push(obj)
        }
    })
    Object.keys(categories).forEach((key) =>{ if (global.hiddenCategories[key]) delete categories[key]; })
    var fields = [];
    Object.keys(categories).forEach((category) => {
        var oldOBJ = categories[category];
        var obj = {};
        if (categoryAliases[category]) {
            obj['name'] = categoryAliases[category];
            var txt = '';
            oldOBJ.forEach((command) => {  if ((command[1])&&(command[1].length)&&(command[3])&&(command[4])&&(command[5])) { txt = txt + "**/" + command[5] + "** (" + command[1].join(", ") + ") - " + command[4]; if (!(oldOBJ.indexOf(command) == oldOBJ.length - 1)) txt = txt + "\n"; } })
            obj['value'] = txt;
            if ((obj['name'])&&(obj['value'])) fields.push(obj);
        }
    })
    var fields1 = [];
    fields.forEach((field) => {
        fields1.push(field);
        if (!(fields.indexOf(field) == fields.length - 1)) fields1.push({ name: '\u200B', value: '\u200B' })
    })
    var embedEN = new discord.MessageEmbed()
        .setColor('#ffa530')
        .setTitle(`Server commands`)
        .setDescription(`__What can our bot do?__\n\u200b`)
        .addFields(fields1);
    var msgen = await message.channel.send(embedEN);
    msgen.react("🇨🇿");
    const time = 60000; //amount of time to collect for in milliseconds
    const filter = (reaction, user) => { return ["🇨🇿"].includes(reaction.emoji.name) && user.id === message.author.id; };
    const collector = msgen.createReactionCollector(filter, { time: time });
    collector.on('collect', async (reaction, reactionCollector) => {
        if (reaction = '🇨🇿') {
            Czech(message, client);
            msgen.delete();
        }
    });
    setTimeout(function() { if (!(msgen.deleted)) msgen.delete(); }, 60000)
}

module.exports = {
    run: async (client, message, args) => {
        message.delete();
        Czech(message, client);
    },
    descriptionCZ: "Pomoc",
    descriptionEN: "Help",
    allowedIn: ['guild', 'dm'],
    czAlias: "pomoc",
    aliases: ['help', 'pomoc']
}
