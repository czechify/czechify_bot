const discord = require('discord.js');

function isInteger(value) { return /^\d+$/.test(value); }

module.exports = {
    run: async (client, message, args) => {
        message.delete();
        var canDo = true;
        module.exports.aliases.forEach((alias) => { if (args[0].includes(alias)) canDo = false; })
        if (message.member.hasPermission('MANAGE_MESSAGES')) {
            if ((canDo)||(!(isInteger(args[0])))) message.channel.bulkDelete(5); else {
                var amount = args[0];
                if (!(parseInt(args[0]) <= 100)) var amount = 100;
                if (!(parseInt(args[0]) > 0)) var amount = 1;
                message.channel.bulkDelete(amount)
            }
        }else {
            let embed = new discord.MessageEmbed()
                .setDescription(`**Nemáš na to práva**!`)
                .setColor('#ff3c36')
                .setAuthor("Podvodníku")
                .setImage("https://i.imgur.com/AveAmWu.gif");
            message.channel.send(embed).then(msg => { msg.delete({ timeout: 5000 }).catch((e) => {}) });
        }
    },
    descriptionCZ: "Hromadné mazání zpráv",
    descriptionEN: "Bulk delete messages",
    allowedIn: ["guild"],
    czAlias: "smazat",
    aliases: ['purge', 'cleanup', 'vycistit', 'smazat']
}
