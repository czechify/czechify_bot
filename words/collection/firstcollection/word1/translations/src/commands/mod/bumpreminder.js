const discord = require('discord.js');
module.exports = {
    run: async (client, message, args) => {

        var timerStep = 7200000;   // Time beetwen calls

                setTimeout(() => {
                    let embed = new discord.MessageEmbed()
                        .setColor("#ffa530")
                        .addFields(
                            { name: 'Jedeme', value: `Strčme ne, lidi? :wink:` },
                        )
                    message.channel.send(embed)
                }, timerStep);

            
        
    
    },
    aliases: ['']
}