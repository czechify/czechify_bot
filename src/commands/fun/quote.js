const discord = require('discord.js');

module.exports = {
    run: async(client, message, args)  => {
        message.delete();
        var canDo = true;
        module.exports.aliases.forEach((alias) => { if (args[0].includes(alias)) canDo = false; })
        if (canDo) {
            var embed = new discord.MessageEmbed()
                .setDescription('**"' + args.join(" ") + '"**' + "\n\n*- " + message.member.displayName + ", " + new Date().getFullYear() + '*')
                .setColor('#ffa530')
                .setThumbnail(message.author.displayAvatarURL());
            message.channel.send(embed).then((msg) => { msg.delete({ timeout: 86400000 }).catch((e) => {}) });
        }else{
            var embed = new discord.MessageEmbed()
                .setColor("#d7141a")
                .addFields(
                    { name: '\u200B', value: ':flag_cz: **/citat** *TváHlubokáMyšlenka*!' },
                    { name: '\u200B', value: ':flag_gb: **/quote** *YourDeepThought*!' }
                )
                .setThumbnail("https://i.imgur.com/AveAmWu.gif");
            message.channel.send(embed).then(msg => { msg.delete({ timeout: 10000 }).catch((e) => {}) });
        }
    },
    descriptionCZ: "Zkrášli své myšlenky",
    descriptionEN: "Prettify your thoughts",
    allowedIn: ['guild'],
    czAlias: "citát",
    aliases: ['quote', 'quoteme', 'isaid', 'citation', 'citat']
}
