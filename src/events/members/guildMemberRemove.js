const discord = require('discord.js');

module.exports = async (client, member) => {
    var logChannel = await global.findAChannel(1, member.guild, "🗒logs")
    let embed = new discord.MessageEmbed()
        .setDescription(`__Uživatel ${member.user.tag} odešel__\nID: ${member.id}\nPřipojil se ${member.joinedAt.toISOString().replace('-', '/').split('T')[0].replace('-', '.')}`)
        .setColor('#616161')
    logChannel.send(embed);
}