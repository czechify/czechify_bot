const { magenta } = require("ansi-colors");
const { MessageFlags } = require("discord.js");

accentsTidy = function(s){
    return s.toLowerCase().replace(new RegExp(/[àáâãäå]/g), "a").replace(new RegExp(/æ/g), "ae").replace(new RegExp(/ç/g), "c").replace(new RegExp(/[èéêë]/g), "e").replace(new RegExp(/[ìíîï]/g), "i").replace(new RegExp(/ñ/g), "n").replace(new RegExp(/[òóôõö]/g), "o").replace(new RegExp(/œ/g), "oe").replace(new RegExp(/[ùúûü]/g), "u").replace(new RegExp(/[ýÿ]/g), "y");
};

const PREFIX = "/"
const thanksWords = ["thank you", "díky", "děkuji", "thnx", "thx", "thnks", "děkuju", "спс", "спасибо", "спасибочки", "спасиб", "пасиб", "thnk", "thks"];

module.exports = (client, message) => {
    if(message.author.bot) return;
    if(message.content.includes(":sakra:")) message.reply(`<@270973904359653387> thanks you for using ${message.guild.emojis.cache.find(emoji => emoji.name === 'sakra')} :)`).then((msg) => { msg.delete({ timeout: 10000 }).catch((e) => {}) })
    if(thanksWords.some(word => message.content.toLowerCase().includes(word))) client.commands['thanks'][0](client, message); else if(message.content == "!d bump") client.commands['bumpreminder'][0](client, message); else if(message.content.startsWith(PREFIX)) {
        broken = false;
        Object.keys(client.commands).forEach((item) => {
            if (!(broken)) {
                var tidyItem = accentsTidy(item);
                if ((accentsTidy(message.content)).startsWith('/' + tidyItem)) {
                    var argsToParse = accentsTidy(message.content.substring(message.content.indexOf(' ') + 1).substring(item)).split(" ");

                    if (message.guild) { if ((client.commands[item][1])&&(client.commands[item][1].includes('guild'))) client.commands[item][0](client, message, argsToParse); else message.reply("This command cannot be run from inside a guild"); }else{ if ((client.commands[item][1])&&(client.commands[item][1].includes('dm'))) client.commands[item][0](client, message, argsToParse); else message.reply("This command cannot be run from inside DMs"); }
                    broken = true;
                }
            }
        })
        if (!(broken)) {
            message.delete();
            message.reply("This command doesn't exist").then((msg) => { msg.delete({ timeout: 5000 }).catch((e) => {}) });
        }
    }
}
