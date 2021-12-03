const discord = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        if (!message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) {
            let embed = new discord.MessageEmbed();
            embed
                .setDescription("**Podvodníku**")
                .setColor('#ff3c36')
                .setAuthor(`Ticho buď`)
                .setThumbnail("https://i.imgur.com/l7osGZv.png");
                message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                message.delete();

        }
        else {
            let announcement = message.content.substring(message.content.indexOf(' ')+1);
            let announcementsChannel = client.channels.cache.find(role => role.name === "🤖bot-help");
            if (announcementsChannel) {
                let embed = new discord.MessageEmbed()
                .setColor('#ffa530')
                .setTitle(`Server commands`)
                .setDescription(`__What can our bot do?__\n\u200b`)
                .addFields(
                    { name: `Fun :smile:`, value: `**/quote** (citat, isaid)\n**/dice** (hod) - Throws the dice` },
                    { name: '\u200B', value: '\u200B' },
                    { name: `Usefulness :tools:`, value: `**/level** - Change your current Czech level\n**/tr [sentence]** translate **anything** :open_mouth:\n**/stats** - Check how you're doing\n**/poll** [question] - Start a poll!\n**/voice** - Get the **Voice Chat** role` },
                    //{ name: '\u200B', value: '\u200B' }
                    //{ name: `Words <:cz_check:499237381635964929>`, value: `**/play** - Play the word game!\n**/word** - Get a new word\n**/mywords** - Enjoy your word collection\n**/market** - Trade easy words for harder ones\n`}
                    );
                
                announcementsChannel.send(embed);
                
            }
        }
    },
    aliases: ['announcement']
}