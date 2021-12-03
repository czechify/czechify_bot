const discord = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        if (!message.member.hasPermission('KICK_MEMBERS')) {
            let embed = new discord.MessageEmbed();
            embed
                .setDescription("**Podvodníku**")
                .setColor('#ff3c36')
                .setAuthor(`Sám se očisti!`)
                .setThumbnail("https://imgur.com/lDIeEaU");
            message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
            message.delete();

        }
        else {
            
            await message.channel.messages.fetch({ limit: args}).then(messages => { // Fetches the messages
                message.channel.bulkDelete(messages) // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API) 
            });
}},
        aliases: ['']
    }