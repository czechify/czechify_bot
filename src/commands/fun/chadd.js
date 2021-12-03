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

            fs.readFile('./src/commands/member/stats.json', 'utf8', async function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(data);
                    const list = client.guilds.cache.get("735043848757051464"); 
                    
                    list.members.cache.forEach(function(member) {
                        var newObj = {
                        "id": member.id,
                        "messagecount": 11111,
                        "lastmessage": "1598530409921",
                        "brid": "null"
                      }
                      obj[member.id] = newObj;
                    }); 
                    
                        
                          

                          json = JSON.stringify(obj, null, 4); //convert it back to json

                          fs.writeFile('./src/commands/member/stats.json', json, 'utf8', (err, content) => {
                            if (err) {
                                console.log("File read failed:", err)
                                return
                            }
                        })
                    }                 
        
    })
},
aliases: []
}
