const discord = require('discord.js');
const fs = require('fs')

module.exports = {
    run: async (client, message, args) => {
         fs.readFile('./src/commands/member/stats.json', 'utf8', async function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                obj = JSON.parse(data);
                let partner;
                let mentionedMember = message.mentions.members.first();
                let mMemberTime;
                if (mentionedMember){
                    for(var user in obj) {
                        if (user == mentionedMember.id) {
                            if (obj[user]['brid'] === "null"){
                                partner = "**Zatím nemá :3**"
                            }else{
                                partner = await message.guild.members.fetch(`${obj[user]['brid']}`);
                            }
                            var Time = new Date();
                            var theTime = Time.getTime();
                            mMemberTime = mentionedMember.joinedAt;
                            usertimeMS = theTime - mMemberTime.getTime();
                            usertime = (usertimeMS/(60*60*24*1000));
                            
                            console.log(usertime);
                            dailyAvg = Math.trunc(obj[user]['messagecount']/usertime);
                            lastMSG =  new Date(parseInt(obj[user]['lastmessage']));
                            var todaysDate = new Date();
                            mins = minutes_with_leading_zeros(lastMSG);
                            hours = lastMSG.getHours()+2;
                            day = lastMSG.getDay();
                            month = lastMSG.getMonth();
                            
                            function minutes_with_leading_zeros(dt) 
                            { 
                            return (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
                            }

                            if(lastMSG.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
                                lastMSG = `Dnes v ${hours}:${mins}`
                            }else{
                                lastMSG = `${day}.${month}. v ${hours}:${mins}`
                            }
                            
                            let embed = new discord.MessageEmbed();
                            embed
                                .setDescription(`\u200BPočet zpráv: **${obj[user]['messagecount']}**\n\nDenní průměr zpráv: **${dailyAvg}**\n\nPartner <:uwu:743509835408081007>: ${partner}\n\nPoslední zpráva: **${lastMSG}**`)
                                .setColor('#fafafa')
                                .setAuthor(`Informace o ${mentionedMember.displayName}`);
                            message.channel.send(embed);
                            return;
                        }
                    }
                }else{
                for(var user in obj) {
                    if (user == message.author.id) {
                        if (obj[user]['brid'] === "null"){
                            partner = "**Zatím nemá :3**"
                        }else{
                            partner = await message.guild.members.fetch(`${obj[user]['brid']}`);
                        }
                        var Time = new Date();
                        var theTime = Time.getTime();
                        usertimeMS = theTime - message.member.joinedAt;
                        usertime = (usertimeMS/(60*60*24*1000));
                        dailyAvg = Math.trunc(obj[user]['messagecount']/usertime);
                        lastMSG =  new Date(parseInt(obj[user]['lastmessage']));
                        var todaysDate = new Date();
                        mins = minutes_with_leading_zeros(lastMSG);
                        hours = lastMSG.getHours()+2;
                        day = lastMSG.getDay();
                        month = lastMSG.getMonth();

                        function minutes_with_leading_zeros(dt) 
                            { 
                            return (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
                            }

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
        }
        })

        

    },
    aliases: ['informace', 'info', 'omne', 'stats']
}