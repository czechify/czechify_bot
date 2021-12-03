const discord = require('discord.js');
module.exports = {
    run: async(client, message, args)  => {
        if(!message.member.hasPermission('BAN_MEMBERS')){

            let embed = new discord.MessageEmbed();
            var bookname = booknames[Math.floor(Math.random() * booknames.length)];
        
            embed
                .setDescription(`Nesmíš! OwO`)
                .setColor('#fcfcfc')
                .setAuthor(`Ne >:C`)
                message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }));
                message.delete();
        }else{
            var chann = client.channels.cache.find(role => role.name === "😎︴pfedstavení");

            let memberId = message.mentions.users.first();
            let welcomeMsg = new discord.MessageEmbed()
            .setColor('#fcfcfc')
            .setTitle(`${memberId.username}!`)
            .setDescription(`__Už jsi u nás dlouho!__ <:aha:738149955402727435>
            
Jsme moc rádi, že jsi s námi!
Ale, jak vidíš, jediný otevřený kanál pro tebe je <#735473018889043978>!
Pro odemčení celého serveru poším napiš do <#735470106037059605>! 
        
**Dávám ti den >:3** 

Čekáme! <a:takagismug:735503051380752414>`);
            memberId.send(welcomeMsg);
            chann.send(`${memberId}`).then(msg => msg.delete())
        }
    },
    aliases: ['připomenoutpředstavení']
}