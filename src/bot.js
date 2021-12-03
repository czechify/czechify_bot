require('dotenv').config();
const fetch = require('node-fetch');
global.isBumped = false;
global.translateToken = {token: "", time: 0}
global.allowedUsers = ["243425689376653312", "270973904359653387", "298873046696067072"]
global.react = async function(msg, emojis) {
    try { emojis.forEach((emoji) => msg.react(emoji)) }catch{ }
}
global.removeAccents = function(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
String.prototype.l = function() {
    return this.toLowerCase();
}
String.prototype.cu = function() {
    return global.removeAccents(this.toLowerCase());
}

global.getToken = async function() {
    const response = await fetch("https://iam.api.cloud.yandex.net/iam/v1/tokens", {
        method: 'POST',
        body: JSON.stringify({ yandexPassportOauthToken: 'AgAAAAArFTmlAATuwTETRou8_UK4pEP9V4uUyNs' })
    });
    return response.json();
}
global.translateText = async function(data, data1) {
    data['folder_id'] = "b1g1drn8ercdap54db6k";
    const response = await fetch('https://translate.api.cloud.yandex.net/translate/v2/translate', {
        method: 'POST',
        headers: {'Authorization': 'Bearer ' + data1},
        body: JSON.stringify(data)
    });
    return response;
}
global.titleCase = function(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}
global.sortByKey = function(obj, paramName) {
    var values = [];
    Object.keys(obj).forEach((key) => { values.push(obj[key][paramName]); })
    values = values.sort();
    var output = [];
    Object.keys(obj).forEach((key) => {
        var item = obj[key];
        var paramValue = item[paramName];
        if (!(values.indexOf(paramValue) == -1)) {
            output[values.indexOf(paramValue)] = item;
            delete values[values.indexOf(paramValue)];
        }
    })
    return output;
}
global.log = function(mode, client, message, logChannelName, description, color) {
    if (mode == 0) {
        var channel = global.findAChannel(0, message.guild, logChannelName);
        var embed = new discord.MessageEmbed()
            .setDescription(description)
            .setColor(color)
        channel.send(embed);
    }else if (mode == 1) {
        var channels = global.findChannels(0, client, logChannelName)
        var embed = new discord.MessageEmbed()
            .setDescription(description)
            .setColor(color)
        channels.forEach((channel) => { channel.send(embed); })
    }else {
        message.channel.send("fuck off and fix ur gay bot")
        return;
    }
}
global.findARole = async function(guild, mode, roleIdentifier) {
    var roles = [];
    if (mode == 0) {
        guild.roles.cache.forEach((role) => { if (role.name.includes(roleIdentifier)) roles.push(role); })
    }else if (mode == 1) {
        guild.roles.cache.forEach((role) => { if (role.color == roleIdentifier) roles.push(role); })
    }else {
        message.channel.send("fuck off and fix ur gay bot")
        return;
    }
    return roles[0];
}
global.findRoles = async function(guild, mode, roleIdentifiers) {
    var roles = [];
    if (mode == 0) {
        guild.roles.cache.forEach((role) => {
            roleIdentifiers.forEach((roleIdentifier) => {
                if (role.name.includes(roleIdentifier)) roles.push(role);
            })
        })
    }else if (mode == 1) {
        guild.roles.cache.forEach((role) => {
            roleIdentifiers.forEach((roleIdentifier) => {
                if (role.color == roleIdentifier) roles.push(role);
            })
        })
    }else {
        message.channel.send("fuck off and fix ur gay bot")
        return;
    }
    return roles;
}
global.findAChannel = async function(mode, guild, channelName) {
    var channels = [];
    if (mode == 0) {
        guild.channels.cache.forEach((channel) => { if (channel.name.includes(channelName)) channels.push(channel); })
    }else if (mode == 1) {
        guild.channels.cache.forEach((channel) => { if (channel.name == channelName) channels.push(channel); })
    }else {
        message.channel.send("fuck off and fix ur gay bot")
        return;
    }
    return channels[0];
}
global.findChannels = async function(mode, cg, channelName, types) {
    var channels = [];
    if (mode == 0) {
        cg.channels.cache.forEach((channel) => { if ((channel.name.includes(channelName))&&(types.includes(channel.type))) channels.push(channel); })
    }else if (mode == 1) {
        cg.guilds.cache.forEach((guild) => {
            var gd = false;
            guild.channels.cache.forEach((channel) => {
                if ((channel.name.includes(channelName))&&(!(gd))&&(types.includes(channel.type))) {
                    channels.push(channel);
                    gd = true;
                }
            })
        })
    }else if (mode == 2) {
        cg.guilds.cache.forEach((guild) => { guild.channels.cache.forEach((channel) => { if ((channel.name.includes(channelName))&&(types.includes(channel.type))) channels.push(channel); }) })
    }else if (mode == 3) {
        cg.channels.cache.forEach((channel) => {
            channelName.forEach((nom_du_canal) => { if ((types.includes(channel.type))&&(channel.name.includes(nom_du_canal))) channels.push(channel); })
        })
    }else {
        message.channel.send("fuck off and fix ur gay bot")
        return;
    }
    return channels;
}
global.findEmoji = async function(guild, emojiName) {
    var emojis = [];
    guild.emojis.cache.forEach(async (emoji) => {
        if (emoji.name == emojiName) emojis.push(emoji);
    })
    return emojis[0]
}
global.findMember = async function(guild, ID) {
    var users = [];
    guild.members.cache.forEach(async (member) => {
        if (member.id == ID) users.push(member);
    })
    return users[0]
}
global.findEmojis = async function(guild, mode, emojiName) {
    var emojis = [];
    if (mode == 0) {
        guild.emojis.cache.forEach(async (emoji) => { if (emoji.name.includes(emojiName)) emojis.push(emoji); })
    }else if (mode == 1) {
        guild.emojis.cache.forEach((emoji) => {
            emojiName.forEach((emojiName) => {
                if (emoji.name.includes(emojiName)) emojis.push(emoji);
            })
        })
    }
    return emojis
}

const discord = require('discord.js');
const client = new discord.Client({ partials: ['MESSAGE', 'REACTION']});
const fs = require('fs').promises;
const path = require('path');
const { checkCommandModule, checkProperties } = require('./utils/validate')
const c = require('ansi-colors');
const commandStatus = [[`${c.bold('Command')}`, `${c.bold('Status')}`]];

const cachedMessageReactions = new Map();

client.login("NTMwNDcwNzkwMTkwMDcxODEw.XC5lbA.S1oI3j-55G3Lu7QskKVOayKIs-k");
client.commands = {};

(async function registerCommands(dir = 'commands') {
    let files = await fs.readdir(path.join(__dirname, dir));
    for (let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if (stat.isDirectory()) registerCommands(path.join(dir, file)); else if (file.endsWith(".js")) {
            let cmdName = file.substring(0, file.indexOf(".js"));
            try{
                let cmdModule = require(path.join(__dirname, dir, file));
                if ((checkCommandModule(cmdName, cmdModule))&(checkProperties(cmdName, cmdModule))) {
                    let { aliases, allowedIn, descriptionCZ, descriptionEN, czAlias } = cmdModule;
                    client.commands[cmdName] = [cmdModule.run, allowedIn, dir.substring(9), descriptionCZ, descriptionEN, cmdName, czAlias];
                    if(aliases.length) {
                        aliases.forEach(alias => client.commands[alias] = [cmdModule.run, allowedIn, dir.substring(9), descriptionCZ, descriptionEN, cmdName, czAlias]);
                        commandStatus.push([`${c.cyan(`${cmdName}`)}`, `${c.black.bgGreenBright('Success')}`])
                    }
                }
            }catch(err){
                console.log(err);
                commandStatus.push([`${c.white(`${cmdName}`)}`, `${c.bgRedBright('Success')}`])
            }
        }
    }
})();

(async function registerEvents(dir = 'events') {
    let files = await fs.readdir(path.join(__dirname, dir));
    for (let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory())
            registerEvents(path.join(dir, file));
        else{
            if (file.endsWith(".js")){
                let eventName = file.substring(0, file.indexOf(".js"));
                try{
                    let eventModule = require(path.join(__dirname, dir, file));
                    client.on(eventName, eventModule.bind(null, client));
                //     if(checkCommandModule(eventName, cmdModule)) {
                //         if(checkProperties(eventName, cmdModule)) {
                //             let { aliases } = cmdModule;
                //             client.commands.set(cmdName, cmdModule.run);
                //             if(aliases.lenght !== 0) {
                //                 aliases.forEach(alias => client.commands.set(alias, cmdModule.run));
                //             commandStatus.push(
                //                 [`${c.cyan(`${cmdName}`)}`, `${c.black.bgGreenBright('Success')}`]
                //             )
                //             }
                //     }
                // }
                }catch(err){
                    console.log(err);
                    commandStatus.push(
                        [`${c.white(`${eventName}`)}`, `${c.bgRedBright('Success')}`]
                    )
                }
            }
        }
    }
})();
