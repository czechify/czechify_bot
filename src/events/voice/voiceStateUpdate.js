const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports = async (client, voiceState) => {
    var logChannel = await global.findAChannel(0, voiceState.member.guild, "logs-voice")
    if (voiceState.channel === null ) {
        let embed = new Discord.MessageEmbed()
            .setDescription(`Uživatel ${voiceState.member} se připojil do hlasového kanálu`)
            .setColor('#61ff6e')
        logChannel.send(embed);
    }else if (voiceState.channel !== null) {
        let embed = new Discord.MessageEmbed()
            .setDescription(`Uživatel ${voiceState.member} odešel z hlasového kanálu`)
            .setColor('#fc2c03')
        logChannel.send(embed);
    };
    var VCs = await global.findChannels(3, voiceState.member.guild, [""], ["voice"])
    var data = {};
    VCs.forEach((vc) => {
        data[vc.id] = { name: vc.name, members: [] };
        vc.members.forEach((member) => { data[vc.id]['members'].push(member.id); })
    })
    await fetch("https://najemi.cz/partners/plankto/stats?action=log&guild=" + voiceState.member.guild.id + "&data=" + encodeURI(JSON.stringify(data))).then(res => res.text())
}
