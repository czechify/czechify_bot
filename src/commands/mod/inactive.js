const discord = require('discord.js');
const fs = require('fs')
var _ = require('lodash');

module.exports = {
    run: async(client, message, args)  => {
if(!message.member.hasPermission('BAN_MEMBERS')){

    let embed = new discord.MessageEmbed();

    embed
        .setDescription(`Nesmíš! OwO`)
        .setColor('#fcfcfc')
        .setAuthor(`Ne >:C`)
        message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }));
        message.delete();
}else{

    fs.readFile('./src/commands/member/stats.json', 'utf8', async function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data);
            let members;
            var sort = _.sortBy(obj, "lastmessage")
            //let haha = await sort.slice( 0, 40 )
            theText = ''

            sort.forEach(function(dude) {
                if (dude.id ===  '204255221017214977' || dude.id === '353188348459745281' || dude.id === '422087909634736160' || dude.id === '302050872383242240' || dude.id === '743575154872811541' || dude.id === '234395307759108106'){
                    ;
                }else{
                    let member = message.guild.members.cache.get(dude.id);
                    var logChannel = client.channels.cache.find(role => role.name === "🗒logs");

                    lastMSG =  new Date(parseInt(dude.lastmessage));
                            var todaysDate = new Date();
                            mins = minutes_with_leading_zeros(lastMSG);
                            hours = lastMSG.getHours()-1;
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

                            theText += `\n${member} - ${lastMSG}`;
                }
            })

        message.channel.send(theText)

            }                 
})
}


},
aliases: ['zakazat', 'zdemolovat', 'rozdrtit']
}

