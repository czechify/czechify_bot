const discord = require('discord.js');
module.exports = {
    run: async(client, message, args)  => {
    if(!message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) {
        let embed = new discord.MessageEmbed();
        embed
        .setDescription("**Podvodníku**")
        .setColor('#ff3c36')
        .setAuthor(`Toho neztlumíš`)
        .setThumbnail("https://imgur.com/lDIeEaU");
        message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
        message.delete();
    }
    else{
        let memberId = message.mentions.users.first();
        let mutedMember = message.guild.members.cache.get(memberId.id);
        if(mutedMember){
            if(mutedMember.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']) 
            && !message.member.hasPermission("ADMINISTRATOR")){
                message.channel.send("Toho neztlumíš");
            }
            else {
                let mutedRole = message.guild.roles.cache.find(role => role.name === "Ztlumeno");
                if(mutedRole) {
                    mutedMember.roles.add(mutedRole);
                    let embed = new discord.MessageEmbed();
                    embed
                    .setDescription("**Hurá** :tada:")
                    .setColor('#ff3c36')
                    .setAuthor(`Uživatel ${mutedMember.displayName} byl ztlumen!`)
                    .setThumbnail("https://imgur.com/bTRIPNE");
                    message.channel.send(embed);
                    }else{
                        message.channel.send("Nebyla nalezena role pro ztlumení");
                    }
            }
        }
        Log(mutedMember);
    }

    function Log(member) {
        const logChannel = client.channels.cache.find(channel => channel.name === "🗒logs");
        let embed = new discord.MessageEmbed();
        embed
        .setDescription(`__Uživatel ${member} byl ztlumen__\nID: ${member.id}}`)
        .setColor('#616161')
        logChannel.send(embed);
    }

},
aliases: ['mute', 'zavritpusu']
}