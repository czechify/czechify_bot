const discord = require('discord.js');

module.exports = {
    run: async(client, message, args)  => {
    const rollDice = () => Math.floor(Math.random() * 6) + 1;
    let embed = new discord.MessageEmbed();
        embed
        .setDescription("**Nepodporujeme hazardováni**")
        .setColor('#dbe9ff')
        .setAuthor(`Hodil jsi ${rollDice()}`)
        .setThumbnail("https://i.imgur.com/BXtTdLS.png");
        message.channel.send(embed);

},
aliases: ['dice', 'rolldice', 'diceroll', 'hoď']
}