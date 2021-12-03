const discord = require('discord.js');
module.exports = {
    run: async(client, message, args)  => {
        
let embedContent = message.content.substring(message.content.indexOf(' ')+1);
let quoteChannel = client.channels.cache.find(role => role.name === "🔳daily-quote");

if(embedContent == message.content){

    var booknames = require('../../booklist')

    let embed = new discord.MessageEmbed();
    var bookname = booknames[Math.floor(Math.random() * booknames.length)];


    embed
    .setDescription(`Nesmíš! OwO`)
    .setColor('#fcfcfc')
    .setAuthor(`Ne >:C`)
    message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }));
    message.delete();
}else{
let embed = new discord.MessageEmbed()
.setTitle(`__Denní citát__`)
.setDescription(embedContent)
.setColor('#fafafa')
quoteChannel.send(embed);
}
},
aliases: ['']
}
