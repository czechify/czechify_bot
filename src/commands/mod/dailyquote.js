const discord = require('discord.js');
module.exports = {
    run: async(client, message, args)  => {
        
let embedContent = message.content.substring(message.content.indexOf(' ')+1);
let quoteChannel = client.channels.cache.find(role => role.name === "📜denní-citát");

if(embedContent == message.content){
    message.delete();
    let embed = new discord.MessageEmbed()
    .setColor("#ffa530")
    .addFields(
        { name: ':flag_cz:', value: `Musíš napsat, co chceš říct!` },
        { name: ':flag_gb:', value: `Write what you want to say!` }
    )
    message.channel.send(embed)
    .then(msg => msg.delete({ timeout: 5000 }));
}else{
let embed = new discord.MessageEmbed()
.setTitle(`__Denní citát__`)
.setDescription(embedContent)
.setColor('#ffa530')
quoteChannel.send(embed);
}
},
aliases: ['']
}
