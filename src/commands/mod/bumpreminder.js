const discord = require('discord.js');

async function IsBumped(message){
    isbumped = global.isbumped;
    var timerStep = 7200000;
    if(isbumped){
        var embed = new discord.MessageEmbed()
            .setColor("#ffa530")
            .addFields({name: `Ještě ne!`, value: "lolec"})
        message.channel.send(embed);
    }else{
        global.isbumped = true;
        setTimeout(function() {
            global.isbumped = false;
            var embed = new discord.MessageEmbed()
                .setColor("#ffa530")
                .addFields({name: 'Jedeme', value: `Strčme ne, lidi? :wink:`})
            message.channel.send(embed)
        }, timerStep);
    }
}
module.exports = {
    run: async (client, message, args) => {
        IsBumped(message)
    },
    descriptionCZ: "Připomenout bamp",
    descriptionEN: "Bump reminder",
    allowedIn: ["guild"],
    czAlias: "N/A",
    aliases: ['bumpreminder', "N/A"]
}
