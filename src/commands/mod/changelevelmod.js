const discord = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        message.delete();
        var emojis = global.sortByKey(await global.findEmojis(message.guild, 1, ["_beginner", "_intermediate", "_advanced", "_fluent", "_native_speaker"]), "name");
        const time = 60000
        var embed = new discord.MessageEmbed()
            .setColor('#ffa530')
            .setDescription(`**Zareaguj na zprávu pro zvolení své úrovně!\n\u200b**`)
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
        var ReactionMessage = await message.channel.send(embed)
        await global.react(ReactionMessage, [emojis[1], emojis[3], emojis[0], emojis[2], emojis[4]]);
        ReactionMessage.changeLevelMessage = true;
    },
    descriptionCZ: "clm",
    descriptionEN: "clm",
    allowedIn: ["guild"],
    czAlias: "clm1",
    aliases: ['changelevelmod', 'clm', 'clm1']
}
