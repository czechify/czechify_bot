const discord = require('discord.js');
const fs = require('fs')

module.exports = {
    run: async(client, message, args)  => {
        
        let embed = new discord.MessageEmbed();
        let theText = "";
        let win;
        let lose;
        let user;
        let mentionedMember = message.mentions.users.first();

            fs.readFile('./src/commands/fun/chessstats.json', 'utf8', async function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(data);

                    if (mentionedMember) {
                        var newObj = {
                            "id": mentionedMember.id,
                            "win": 0,
                            "loss": 0
                          }
                          obj[mentionedMember.id] = newObj;

                          json = JSON.stringify(obj, null, 4); //convert it back to json

                          fs.writeFile('./src/commands/fun/chessstats.json', json, 'utf8', (err, content) => {
                            if (err) {
                                console.log("File read failed:", err)
                                return
                            }
                        })
                    }                 
        }
    })
},
aliases: ['quote', 'quoteme', 'isaid', 'citation', 'citát']
}
