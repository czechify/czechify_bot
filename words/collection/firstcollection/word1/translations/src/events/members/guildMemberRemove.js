const discord = require('discord.js');

module.exports = async (client, member) => {

    const logChannel = client.channels.cache.find(channel => channel.name === "🗒logs");
    let embed = new discord.MessageEmbed();
        embed
        .setDescription(`__Uživatel ${member.displayName} odešel__\nID: ${member.id}\nPřipojil se ${member.joinedAt.toISOString().replace('-', '/').split('T')[0].replace('-', '.')}`)
        .setColor('#616161')
        logChannel.send(embed);
}