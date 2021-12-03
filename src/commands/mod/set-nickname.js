const discord = require('discord.js')

module.exports = {
    run: async (client, message, args) => {
        if (global.allowedUsers.includes(message.author.id)) {
            if (message.mentions.members.first()) {
                message.mentions.members.first().setNickname(message.content.split('>')[1])
                message.reply("All done!").then((msg) => { msg.delete({ timeout: 5000 }).catch((e) => {}) })
            }
        }else{
            var embed = new discord.MessageEmbed()
                .setDescription(`**Nejsi velká holka**!`)
                .setColor('#ff3c36')
                .setAuthor("Podvodníku")
                .setImage("https://i.imgur.com/AveAmWu.gif");
            message.channel.send(embed).then((msg) => { msg.delete({ timeout: 10000 }).catch((e) => {}) })
        }
    },
    descriptionCZ: "Natavit nekom prezdivku",
    descriptionEN: "Set someone's nickname",
    allowedIn: ["guild"],
    czAlias: "velké-oznámení",
    aliases: ['set-nickname', "nastavit-prezdivku"]
}
