const discord = require('discord.js');

async function Log(member) {
    var logChannel = await global.findChannels(0, member.guild, "logs", ["text"])
    let embed = new discord.MessageEmbed()
        .setDescription(`__Uživatel ${member.user.tag} se přidal__\nID: ${member.id}\nÚčet vznikl ${member.user.createdAt.toISOString().replace('-', '/').split('T')[0].replace('-', '.')}`)
        .setColor('#34ff2f')
    logChannel[1].send(embed);
}


module.exports = async (client, member) => {
    if (member.user.bot) return;
    const time = 600000
    let welcomeMsg = new discord.MessageEmbed()
        .setColor('#ffa530')
        .setTitle('Vítej, ' + member.displayName + '!')
        .setDescription(`:flag_cz: __**Vítám tě na ČEŠTINĚ**, hlavním serveru Česka__!

        •  Pro začátek si nastav úroveň češtiny a svou rodnou zemi!
        •  Neboj se kdykoli napsat do <#433946325969797133>, zeptat v <#434230418334547968> nebo se připojit do hlasového kanálu!
        •  V # bot se můžeš učit nová slovíčka s pomocí **slovo**!
        •  Jestli budeš potřebovat pomoc napiš adminům!


        :flag_gb: __**Welcome to CZECH**, the main Czech server__!

        •  Firstly, set your Czech level and your country!
        •  Don't be afraid to write to <#433946325969797133> at any time, ask in <#434230418334547968> or join the voice channel!
        •  In # bot you can learn new vocabulary with **word**!
        •  If you need help message the admins!`
        );
    member.send(welcomeMsg).then((msg) => { msg.delete({ timeout: time }).catch((e) => {}) })

    var channel = await global.findChannels(3, member.guild, ["welcome", "vitej", "vitejte"], ["text"])
    channel = channel[Object.keys(channel)[0]];
    if (channel) channel.send(`Vítej ${member}!`).then(msg => msg.delete()).catch((e) => {})

    var learningRole = await global.findARole(member.guild, 0, "Learning Czech");
    member.roles.add(learningRole);

    Log(member);

    var roles = global.sortByKey(await global.findRoles(member.guild, 0, ["Beginner", "Intermediate", "Advanced", "Fluent", "Native Speaker", "Learning Czech"]), "name");
    var emojis = global.sortByKey(await global.findEmojis(member.guild, 1, ["_beginner", "_intermediate", "_advanced", "_fluent", "_native_speaker"]), "name");

    let embed = new discord.MessageEmbed()
        .setColor('#ffa530')
        .setDescription(`**${member}, Zareaguj na zprávu pro zvolení své úrovně!\n\u200b**`)
        .addFields(
            { name: `${emojis[1]} **Beginner** - I'm just starting to learn`, value: `${emojis[1]} **Začátečník** - Teprve se začínám učit` },
            { name: '\u200B', value: '\u200B' },
            { name: `${emojis[3]} **Intermediate** - I can construct sentences`, value: `${emojis[3]} **Středně pokročilá** - Můžu sestavovat věty` },
            { name: '\u200B', value: '\u200B' },
            { name: `${emojis[0]} **Advanced** - Talking isn't a problem for me`, value: `${emojis[0]} **Pokročilá** - Mluvení pro mne není problém` },
            { name: '\u200B', value: '\u200B' },
            { name: `${emojis[2]} **Fluent** - Czech is my second self`, value: `${emojis[2]} **Plynná** - Čeština je mé druhé já` },
            { name: '\u200B', value: '\u200B' },
            { name: `${emojis[4]} **Native speaker** - That's apparent :sunglasses:`, value: `${emojis[4]} **Rodilý mluvčí** - No to je jasné :sunglasses:` },
        )
    var ReactionMessage = await channel.send(embed)
    global.levelMessages.push(ReactionMessage.id);
    setTimeout(function() { ReactionMessage.delete() }, time)
    await global.react(ReactionMessage, [emojis[1], emojis[3], emojis[0], emojis[2], emojis[4]]);
}
