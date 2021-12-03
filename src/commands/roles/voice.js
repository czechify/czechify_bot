const discord = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        let voiceRole = message.guild.roles.cache.find(role => role.name === "Voice Chat");
        if (message.member.roles.cache.some(r => r.name === "Voice Chat")) {
            message.member.roles.remove(voiceRole);

            let embed = new discord.MessageEmbed()
                .setColor("#d54aff")
                .addFields(
                    { name: ':flag_cz:\u200B', value: `Už nemáš roli **Voice Chat**! Nesoudím tě 👎` },
                    { name: ':flag_gb:\u200B', value: `You don't have the **Voice Chat** role anymore! I'm not judging you 👎` }
                )
                .setFooter(message.member.displayName, message.member.user.displayAvatarURL());

            message.channel.send(embed);
            message.delete();
        } else {
            message.member.roles.add(voiceRole);
            let embed = new discord.MessageEmbed()
                .setColor("#d54aff")
                .addFields(
                    { name: ':flag_cz:\u200B', value: `Teď máš roli **Voice Chat**! Dobrá volba 👍` },
                    { name: ':flag_gb:\u200B', value: `You now have the **Voice Chat** role! Good choice! 👍` }
                )
                .setFooter(message.member.displayName, message.member.user.displayAvatarURL());

            message.channel.send(embed);
            message.delete();
        }
    },
    aliases: ['hlas', 'voicechat', 'rolehlas']
}