const discord = require('discord.js');
module.exports = {
    run: async(client, message, args)  => {
        
let embedContent = message.content.substring(message.content.indexOf(' ')+1);
if(embedContent == message.content){
    message.delete();
    let embed = new discord.MessageEmbed()
    .setColor("#ffa530")
    .addFields(
        { name: 'u200B', value: `Musíš napsat, co chceš říct!` },
    )
    .setThumbnail("https://i.imgur.com/UbPcufD.png");
    message.channel.send(embed)
    .then(msg => msg.delete({ timeout: 5000 }));
}else{
let embed = new discord.MessageEmbed()
.setTitle(`${message.member.displayName}:`)
.setDescription(embedContent)
.setColor('#ffa530')
.setThumbnail("https://i.imgur.com/UbPcufD.png");
message.channel.send(embed);
message.delete();
}
},
aliases: ['quote', 'quoteme', 'isaid', 'citation', 'citát']
}
