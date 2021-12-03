const discord = require('discord.js');
const fetch = require('node-fetch');

var aliases = ['confess']

module.exports = {
    run: async(client, msg, args)  => {
        if (msg.guild) {
            msg.delete()
            msg.reply("Please send your confession in dms.")
            return;
        }
        var args = "";
        aliases.forEach((item) => {
            if (msg.content.startsWith("/" + item)) {
                console.log(item)
                args = msg.content.substring(("/" + item).length + 1) 
            }
        })
        if (args) {
            
            //var allWords = await fetch("https://najemi.cz/partners/plankto/?action=getUserData&userID=" + userid).then(res => res.text())

            //sent to server, now just send it to the confessions channel in all guilds the bot is in (simple)


        }else{
            msg.reply("Please confess something")
        }
    },
    aliases: ['confess']
}