const discord = require('discord.js');
const fs = require('fs')

module.exports = {
    run: async(client, message, args)  => {
        
        let embed = new discord.MessageEmbed();
        let theText = "";
        let win;
        let lose;
        let user;
        let mentionedMembers = message.mentions.users.array();

        if (!message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) {

            let embed = new discord.MessageEmbed();
            embed
            .setDescription(`Nesmíš! OwO`)
            .setColor('#fcfcfc')
            .setAuthor(`Ne >:C`)
            message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }));
            message.delete();
        }
        else {

            fs.readFile('./src/commands/fun/chessstats.json', 'utf8', async function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(data);

                    if (mentionedMembers) {
                          obj[mentionedMembers[0].id]['win'] = obj[mentionedMembers[0].id]['win']+1;
                          obj[mentionedMembers[1].id]['loss'] = obj[mentionedMembers[1].id]['loss']+1;

                          win1 = obj[mentionedMembers[0].id]['win'];
                          loss1 = obj[mentionedMembers[0].id]['loss'];
                          average1 = win1 - loss1;

                          win2 = obj[mentionedMembers[1].id]['win'];
                          loss2 = obj[mentionedMembers[1].id]['loss'];
                          average2 = win2 - loss2;

                          json = JSON.stringify(obj, null, 4); //convert it back to json

                          let announcementsChannel = client.channels.cache.find(role => role.name === "🤓︴šachový-turnaj♟");
                          if (announcementsChannel) {
                              let embed = new discord.MessageEmbed();
                          embed
                              .setDescription(`Hráč ${mentionedMembers[0]} (${average1}) porazil hráče ${mentionedMembers[1]} (${average2})! <:mmmm:740999796038434956>`)
                              .setColor('#fbfbfb');
                              announcementsChannel.send(embed);
              
                          }
                      }
                      
                          fs.writeFile('./src/commands/fun/chessstats.json', json, 'utf8', (err, content) => {
                            if (err) {
                                console.log("File read failed:", err)
                                return
                            }
                        })
                        message.delete();
                               
        }
    })

        }
},
aliases: []
}
