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
            var logChannel = client.channels.cache.find(role => role.name === "🗒logs");

            let memberId = message.mentions.users.first();
            let welcomeMsg = new discord.MessageEmbed()
            .setColor('#fcfcfc')
            .setTitle(`${memberId.username}!`)
            .setDescription(`__Už jsi u nás dlouho!__ <:aha:738149955402727435>
            
Jsme moc rádi, že jsi s námi!
Ale poslední dobou nějak **nepíšeš**! :c
Víš, že aktivitu si vážíme nade vše, takže se s námi pobav nebo napiš proč zrovna nemáš čas...

**Budu čekat :3** <a:takagismug:735503051380752414>`);
            memberId.send(welcomeMsg);
            let embed = new discord.MessageEmbed();
        embed
        .setDescription(`${memberId} byl varován!`)
        .setColor('#96ffb2')
        logChannel.send(embed);
        }
    },
    aliases: ['připomenoutaktivitu']
}