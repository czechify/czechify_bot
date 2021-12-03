const discord = require('discord.js');
const fs = require('fs')
module.exports = async (client, member) => {
    let welcomeMsg = new discord.MessageEmbed()
            .setColor('#ffa530')
            .setTitle(`Vítej, ${member.displayName}!`)
            .setDescription(`Ahoj!!!! <:joooo:735501352792227845>

Jsme tak rádi, že jsi s námi! Jak vidíš, jediný otevřený kanál pro tebe je <#735473018889043978>! Pro odemčení celého serveru poším napiš <#735470106037059605>!

Čekáme! <a:takagismug:735503051380752414>
`);
    member.send(welcomeMsg);
    const channel = member.guild.channels.cache.find(ch => ch.name === '😗︴nováčci');
    const predstavenichannel = member.guild.channels.cache.find(ch => ch.name === '😎︴pfedstavení');

    channel.send(`Vítej ${member}!`).then(msg => msg.delete());
    let learningRole = member.guild.roles.cache.find(role => role.name === "nováček 🤗");
    member.roles.add(learningRole);

    fs.readFile('./src/commands/member/stats.json', 'utf-8', function (err, data) {

        obj = JSON.parse(data);
        
        var newObj = {
            "id": member.id,
            "messagecount": 0,
            "lastmessage": "1598530409921",
            "brid": "null"
        }       

        obj[member.id] = newObj;

        if (err)
            return console.error(err);
            json = JSON.stringify(obj, null, 4); //convert it back to json

            fs.writeFile('./src/commands/member/stats.json', json, { flag: 'w' }, function(err) {
                if (err) 
                    return console.error(err);
                    userMessageCount=[];
       });
});

    

    Log(client, member);

        let embedCzech = new discord.MessageEmbed()
            .setColor('#fafafa')
            .setTitle(`${member.displayName} je tu!!`)
            .setDescription(`Ahoj, ${member}! Vítej na **Animeeeeee**! Napiš poším ${predstavenichannel} a odemkni si seueu!! :blush:`)
            .setThumbnail(member.user.displayAvatarURL());
     
         let ReactionMessage = await channel.send(embedCzech);

            channel.send("Ahuj <@" + member.user.id + ">!").then(message => message.delete());

        };

        function Log(client, member) {
            const logChannel = client.channels.cache.find(channel => channel.name === "🗒logs");
            let embed = new discord.MessageEmbed();
                embed
                .setDescription(`__User ${member} entered__\nID: ${member.id}\nAccount created ${member.user.createdAt.toISOString().replace('-', '/').split('T')[0].replace('-', '.')}`)
                .setColor('#34ff2f')
                logChannel.send(`<@735473470061674576>`);
                logChannel.send(embed);
        }
//}