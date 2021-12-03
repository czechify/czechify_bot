const discord = require('discord.js');

module.exports = {
    run: async(client, message, args)  => {
if(!message.member.hasPermission('KICK_MEMBERS')){
let embed = new discord.MessageEmbed();
            embed
                .setDescription("**Podvodníku**")
                .setColor('#ff3c36')
                .setAuthor(`Nech toho`)
                .setThumbnail("https://imgur.com/lDIeEaU");
                message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                message.delete();
}
else{
let memberId = message.mentions.users.first();
let kickedMember = message.guild.members.cache.get(memberId.id);
if(kickedMember) {
    try {
        //console.log(`Uživatel ${memberId.username} byl vyhozen`);
        let embed = new discord.MessageEmbed();
        embed
        .setDescription("**Jupí** :tada:")
        .setColor('#ff3c36')
        .setAuthor(`Uživatel ${memberId.username} byl vyhozen!`)
        .setThumbnail("https://imgur.com/c7HCgta");
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
        .setDescription(`Uživatel ${member} (${member.id}) byl vyhozen`)
        .setColor('#ff3c36')
        logChannel.send(embed);
}

},
aliases: ['kick']
}