const discord = require('discord.js');

async function IsBumped(message){
    isbumped = global.isbumped;

    var timerStep = 7200000; 
    if(!isbumped){
        global.isbumped = true;
                setTimeout(() => {
                    global.isbumped = false;
                    let embed = new discord.MessageEmbed()
                        .setColor("#ffa530")
                        .addFields(
                            { name: 'Jedeme', value: `Strčme ne, lidi? :wink:` },
                        )
                    message.channel.send(embed)
                }, timerStep);
            }else{
                let embed = new discord.MessageEmbed()
                        .setColor("#ffa530")
                        .addFields(
                            { name: `Ještě ne!`, value: "lolec"},
                        )
                    message.channel.send(embed);
            }
}
module.exports = {
    run: async (client, message, args) => {
        IsBumped(message)
    },
    aliases: ['']
}