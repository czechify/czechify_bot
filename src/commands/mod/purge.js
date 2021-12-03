const discord = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        if (!message.member.hasPermission('KICK_MEMBERS')) {

            var booknames = require('../../booklist')
            var bookname = booknames[Math.floor(Math.random() * booknames.length)];
            
            let embed = new discord.MessageEmbed();
            embed
            .setDescription(`Nesmíš! OwO`)
            .setColor('#fcfcfc')
            .setAuthor(`Ne >:C`)
            message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }));
            message.delete();

        }
        else {
            
            await message.channel.messages.fetch({ limit: args}).then(messages => { // Fetches the messages
                message.channel.bulkDelete(messages) // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API) 
            });
}},
        aliases: ['']
    }