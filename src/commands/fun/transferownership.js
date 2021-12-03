const discord = require('discord.js');
module.exports = {
    run: async(client, message, args)  => {
    
    let ownerRole = message.guild.roles.cache.get('720720419769810965');
        if (message.member.roles.cache.has(ownerRole.id)){
        let memberId = message.mentions.users.first();
        let mentionedMember = message.guild.members.cache.get(memberId.id);
        message.member.roles.remove(ownerRole);
        mentionedMember.roles.add(ownerRole);

        let embed = new discord.MessageEmbed();
        embed
        .setDescription(`**${message.member.displayName}** předal __vlastnictví serveru__ dříve obyčejnému uživateli **${mentionedMember.displayName}**!`)
        .setColor('#ffa530')
        .setAuthor("👏 🎉")
        .setThumbnail(mentionedMember.user.displayAvatarURL());
        message.channel.send(embed);

    }else{
        let embed = new discord.MessageEmbed();
        embed
        .setDescription(`**Nejsi majitelem serveru**!`)
        .setColor('#ff3c36')
        .setAuthor("Podvodníku")
        .setThumbnail("https://imgur.com/lDIeEaU");
        message.channel.send(embed);
    }
},
aliases: ['predatvlastnictvi','předatvlastnictví']
}
