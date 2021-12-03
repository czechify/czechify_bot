const discord = require('discord.js');
const booklist = require('../../booklist');

module.exports = {
    run: async (client, message, args) => {
        

        

        if (!message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) {

            let embed = new discord.MessageEmbed();
            embed
            .setDescription(`Nesmíš! OwO`)
            .setColor('#fcfcfc')
            .setAuthor(`Ne >:C`)
            message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }));
            message.delete();
        }
        else {
            let announcement = message.content.substring(message.content.indexOf(' ')+1);
            let announcementsChannel = client.channels.cache.find(role => role.name === "🤓︴šachový-turnaj♟");
            if (announcementsChannel) {
                let embed = new discord.MessageEmbed();
            embed
                .setDescription(announcement)
                .setColor('#fbfbfb')
                announcementsChannel.send(embed);

            }
        }
    },
    aliases: ['announcement']
}