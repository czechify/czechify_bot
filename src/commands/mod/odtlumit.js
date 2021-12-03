const discord = require('discord.js');
module.exports = {
    run: async(client, message, args)  => {
if(!message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) {
    let embed = new discord.MessageEmbed();
    embed
    .setDescription("**Podvodníku**")
    .setColor('#ff3c36')
    .setAuthor(`Sám se odtlum`)
    .setThumbnail("https://imgur.com/lDIeEaU");
    message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
    message.delete();
}
else{
    //let time = message.content.toLowerCase().substring(message.content.indexOf(' ')+1);
    let memberId = message.mentions.users.first();
    let mutedMember = message.guild.members.cache.get(memberId.id);
    if(mutedMember){
        if(mutedMember.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']) 
        && !message.member.hasPermission("ADMINISTRATOR")){
            let embed = new discord.MessageEmbed();
            embed
            .setDescription("**NE!** :tada:")
            .setColor('#ff3c36')
            .setAuthor(`Toho neodtlumíš`)
            .setThumbnail("https://imgur.com/lDIeEaU");
            message.channel.send(embed);
        }
        else {
            let mutedRole = message.guild.roles.cache.find(role => role.name === "Ztlumeno");
            if(mutedRole) {
                mutedMember.roles.remove(mutedRole);
                let embed = new discord.MessageEmbed();
                embed
                .setDescription("**Příště pozor jo**")
                .setColor('#ff3c36')
                .setAuthor(`Uživatel ${mutedMember.displayName} byl odtlumen!`)
                .setThumbnail("https://imgur.com/7UW9J2N");
                message.channel.send(embed);
                }else{
                    message.channel.send("Nebyla nalezena role pro ztlumení");
                }
        }
    }

}
},
aliases: ['unmute']
}