const discord = require('discord.js');
module.exports = {
    run: async(client, message, args)  => {
    if(!message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) {

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
        //let time = message.content.toLowerCase().substring(message.content.indexOf(' ')+1);
        let memberId = message.mentions.users.first();
        let mutedMember = message.guild.members.cache.get(memberId.id);
        if(mutedMember){
            if(mutedMember.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']) 
            && !message.member.hasPermission("ADMINISTRATOR")){

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
            else {
                let mutedRole = message.guild.roles.cache.find(role => role.name === "Ztlumeno");
                if(mutedRole) {
                    mutedMember.roles.add(mutedRole);
                    let embed = new discord.MessageEmbed();
                    embed
                    .setColor('#fafafa')
                    .setDescription(`${mutedMember} teď nemůže mluvit :O`)
                    message.channel.send(embed);
                    }else{
                        message.channel.send("Nenašel jsem!!!");
                    }
            }
        }
        Log(mutedMember);
        message.delete();

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