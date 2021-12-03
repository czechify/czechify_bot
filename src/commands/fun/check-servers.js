const discord = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        message.delete();
        if (global.allowedUsers.includes(message.author.id)) {
            client.guilds.cache.forEach(async (guild) => {
                x = true;
                guild.channels.cache.forEach(async (channel) => {
                    if ((x)&&(channel.type == "text")) {
                        x = false;
                        var m = await channel.createInvite();
                        message.channel.send("discord.gg/" + m['code']);
                    }
                })
            })
        }else{
            var embed = new discord.MessageEmbed()
                .setDescription("**Podvodníku**")
                .setColor('#ff3c36')
                .setAuthor('Nech toho!')
                .setThumbnail("https://i.imgur.com/AveAmWu.gif");
            message.channel.send(embed).then(msg => { msg.delete({ timeout: 5000 }).catch((e) => {}) });
        }
    },
    descriptionCZ: "Servery s ČechBotem",
    descriptionEN: "CzechBot's servers",
    allowedIn: ["guild", "dm"],
    czAlias: "seznam-serverů",
    aliases: ['check-servers', "server-list", "seznam-serveru"]
}
