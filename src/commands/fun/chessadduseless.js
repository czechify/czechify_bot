const discord = require('discord.js');
const fs = require('fs')

module.exports = {
    run: async(client, message, args)  => {

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
},
aliases: []
}
