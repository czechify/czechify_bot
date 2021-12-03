const discord = require('discord.js');
module.exports = {
    run: async(client, message, args)  => {
        let announcement = message.content.substring(message.content.indexOf(' ')+1);
            
                let embed = new discord.MessageEmbed();
                embed
                .setDescription(announcement)
                .setColor('#dbe9ff')
                let theMessage = await message.channel.send(embed);
                theMessage.react("👍");
                theMessage.react("👎");
                message.delete();

    },
    aliases: ['hlasovani', 'hlasování', 'hlasovat']
    }