const discord = require('discord.js');

module.exports = {
    run: async(client, message, args)  => {
if(!message.member.hasPermission('KICK_MEMBERS')){

    var booknames = require('../../booklist')
    var bookname = booknames[Math.floor(Math.random() * booknames.length)];
    
    let embed = new discord.MessageEmbed();
    embed
    .setDescription(`Nesmíš! OwO`)
    .setColor('#fcfcfc')
    .setAuthor(`Ne >:C`)
    message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }));
    message.delete();
}
else{
let memberId = message.mentions.users.first();
let kickedMember = message.guild.members.cache.get(memberId.id);
if(kickedMember) {
    try {
        let embed = new discord.MessageEmbed();
        embed
        .setColor('#fafafa')
        .setAuthor(`${memberId.username} je pvyč! :O`)
        message.channel.send(embed);
        await kickedMember.kick();
    }
    catch(err) {
        console.log(err);
    }
}
}

function Log(member) {
    const logChannel = client.channels.cache.find(channel => channel.name === "🗒logs");
    let embed = new discord.MessageEmbed();
        embed
        .setDescription(`Uživatel ${member} (${member.id}) byl vykopnut`)
        .setColor('#ff3c36')
        logChannel.send(embed);
}

},
aliases: ['kick']
}