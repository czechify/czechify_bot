const discord = require('discord.js');
const fs = require('fs')

module.exports = {
    run: async(client, message, args)  => {
        
        let embed = new discord.MessageEmbed();
        let theText = "";
        let win;
        let lose;
        let user;
        
            fs.readFile('./src/commands/fun/chessstats.json', 'utf8', async function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(data);


                    for(var k in obj) {
                        win = obj[k]['win'];
                        loss = obj[k]['loss'];
                        average = win - loss;
                        user = message.guild.member(obj[k]['id'])
                        theText += `\n\n ${win} | ${loss} | **${average}**   ${user}`;

                     }
                    
                    embed
                    .setDescription(`${theText}`)
                    .setColor('#fafafa')
                    .setAuthor(`♟️ŠACHY♟️`)
                    .setFooter(`Výhry | Prohry | Body`);
                    ;
                    message.channel.send(embed);
                    
                                        
        }
    })
                                        

},
aliases: ['tabulka', 'šachovátabulka', 'turnaj']
}
