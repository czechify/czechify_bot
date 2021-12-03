
const discord = require('discord.js');
const fs = require('fs')

module.exports = async (client, reaction, user) => {
    
    let message = reaction.message, emoji = reaction.emoji;

    if (emoji.name == '✅') {

        
    fs.readFile('./src/commands/fun/chessstats.json', 'utf8', async function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data);

            if (user) {
                var newObj = {
                    "id": user.id,
                    "win": 0,
                    "loss": 0
                  }
                  obj[user.id] = newObj;

                  json = JSON.stringify(obj, null, 4);

                  fs.writeFile('./src/commands/fun/chessstats.json', json, 'utf8', (err, content) => {
                    if (err) {
                        console.log("File read failed:", err)
                        return
                    }
                })
            }                 
}
})

        let embed = new discord.MessageEmbed();
        embed
        .setDescription(`${message.guild.member(user)} SE PŘIDAL/A K TURNAJI!!! <:joooo:735501352792227845>`)
        .setColor('#fcfcfc')
        .setAuthor(`JOOOOOOO`)

                reaction.message.channel.send(embed)
            
    }
}