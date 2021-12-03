const discord = require('discord.js');
module.exports = {
    run: async(client, message, args)  => {
if(!message.member.hasPermission('BAN_MEMBERS')){
    let embed = new discord.MessageEmbed();
    embed
    .setDescription("**Podvodníku**")
    .setColor('#ff3c36')
    .setAuthor(`To bys chtěl co?`)
    .setThumbnail("https://imgur.com/lDIeEaU");
    message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
    message.delete();
}else{
    let memberId = message.mentions.users.first();
    let reason = message.content.substr(`      ${memberId}`.length);
    try{
        console.log(`Uživatel ${memberId.username} byl zabanován za ${reason}`);
        let embed = new discord.MessageEmbed();
        embed
        .addField("Příčina", reason)
        .setDescription("**Hurá** :tada:")
        .setColor('#ff3c36')
        .setAuthor(`Uživatel ${memberId.username} byl zabanován!`)
        .setThumbnail("https://imgur.com/c7HCgta");
        message.channel.send(embed);
        Log(memberId, reason);
        let bannedMember = await message.guild.members.fetch(memberId.id);
        bannedMember.ban({ reason: `${reason}` })
        
    }catch(err) {
        console.log(err);
    }
}

function Log(member, reason) {
    const logChannel = client.channels.cache.find(channel => channel.name === "🗒logs");
    let embed = new discord.MessageEmbed();
        embed
        .setDescription(`Uživatel ${member} byl zabanován!\nID: ${member.id}\nPříčina: ${reason}`)
        .setColor('#ff3c36')
        logChannel.send(embed);
}

},
aliases: ['zakazat', 'zdemolovat', 'rozdrtit']
}