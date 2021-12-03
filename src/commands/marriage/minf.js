const discord = require('discord.js');
const fs = require('fs')

module.exports = {
    run: async (client, message, args) => {
         fs.readFile('./src/commands/member/stats.json', 'utf8', async function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                obj = JSON.parse(data);
                

                for(var user in obj) {
                    if (user == message.author.id) {
                        let partner = await message.guild.members.fetch(`${obj[user]['brid']}`);
                        var Time = new Date();
                        var theTime = Time.getTime();
                        usertimeMS = theTime - message.author.createdTimestamp;
                        usertime = (usertimeMS/(60*60*24*1000));
                        dailyAvg = Math.trunc(obj[user]['messagecount']/usertime);
                        lastMSG =  new Date(parseInt(obj[user]['lastmessage']));
                        console.log(parseInt(obj[user]['lastmessage']));
                        var todaysDate = new Date();
                        mins = lastMSG.getMinutes();
                        hours = lastMSG.getHours();
                        day = lastMSG.getDay();
                        month = lastMSG.getMonth();

                        if(lastMSG.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
                            lastMSG = `Dnes v ${hours}:${mins}`
                        }else{
                            lastMSG = `${day}.${month}. v ${hours}:${mins}`
                        }
                        
                        let embed = new discord.MessageEmbed();
                        embed
                            .setDescription(`\u200BPočet zpráv: **${obj[user]['messagecount']}**\n\nDenní průměr zpáv: **${dailyAvg}**\n\nPartner <:uwu:743509835408081007>: ${partner}\n\nPoslední zpráva: **${lastMSG}**`)
                            .setColor('#fafafa')
                            .setAuthor(`Informace o ${message.member.displayName}`);
                        message.channel.send(embed);
                        return;
                    }
                }
            }
        })

        

    },
    aliases: ['']
}