const discord = require('discord.js');

module.exports = {
    run: async(client, message, args)  => {
        message.delete();
        var canDo = true;
        module.exports.aliases.forEach((alias) => { if (args[0].includes(alias)) canDo = false; })
        if (canDo) {
            var embed = new discord.MessageEmbed()
                .setDescription(args.join(" "))
                .setColor('#dbe9ff')
            message.channel.send(embed).then((msg) => { msg.poll = true; msg.rigged = true; global.react(msg, ["👍"]); msg.delete({ timeout: 86400000 }) });
        }else {
            var embed = new discord.MessageEmbed()
                .setColor("#d7141a")
                .addFields(
                    { name: '\u200B', value: ':flag_cz: **/zmanipulované-hlasování** *TvéTéma*!' },
                    { name: '\u200B', value: ':flag_gb: **/riggedpoll** *YourTopic*!' }
                )
                .setThumbnail("https://i.imgur.com/AveAmWu.gif");
            message.channel.send(embed).then((msg) => { msg.delete({ timeout: 10000 }).catch((e) => {}) });
        }
    },
    descriptionCZ: "Začni zmanipulované hlasování",
    descriptionEN: "Start a rigged poll",
    allowedIn: ['guild'],
    czAlias: "zmanipulované-hlasování",
    aliases: ['riggedpoll', 'zmanipulovane-hlasovai']
}
