const discord = require('discord.js');
module.exports = {
    run: async(client, message, args)  => {
if(message.member.hasPermission('BAN_MEMBERS') || message.member.roles.cache.find(r => r.name === "Přijímač :3")){

    let memberId = message.mentions.users.first();
    let theUser = message.guild.members.cache.get(memberId.id);

    const newMemberRole = message.guild.roles.cache.find(role => role.name === "nováček 🤗");
    const acceptedRole = message.guild.roles.cache.find(role => role.name === "nový člen");

    setTimeout(function(){     theUser.roles.remove(newMemberRole);
        theUser.roles.add(acceptedRole); }, 500);




    let embed = new discord.MessageEmbed();
    embed
        .setDescription(`${memberId} je s námi!!!`)
        .setColor('#fcfcfc')
        .setAuthor(`Ahoooooj!`)
        client.channels.cache.find(role => role.name === "🤗︴baveníčko").send(embed);

        message.delete();

    
}else{
    let embed = new discord.MessageEmbed();
    embed
        .setDescription(`Nesmíš! OwO`)
        .setColor('#fcfcfc')
        .setAuthor(`Ne >:C`)
        message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }));
        message.delete();
}

},
aliases: ['příjmout']
}