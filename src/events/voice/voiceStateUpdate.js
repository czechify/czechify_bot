
const Discord = require("discord.js");

module.exports = (client, voiceState) => {
    /*
    let textChannel = voiceState.member.guild.channels.cache.find(role => role.name === "🎤voice-chat");
    let voiceChannel = voiceState.member.guild.channels.cache.find(role => role.name === "🔊General");
    let voiceChannel2 = voiceState.member.guild.channels.cache.find(role => role.name === "📢Czech only");
    const logChannel = client.channels.cache.find(channel => channel.name === "🗒logs-voice");

    let oldUserChannel = voiceState.voiceChannel

    if (voiceState.channel === null ) {
        let embed = new Discord.MessageEmbed();
            embed
            .setDescription(`Uživatel ${voiceState.member} se připojil do hlasového kanálu`)
            .setColor('#61ff6e')
            logChannel.send(embed);
            startTime = new Date().getTime();
    } else if (voiceState.channel !== null) {

        let embed = new Discord.MessageEmbed();
            embed
            .setDescription(`Uživatel ${voiceState.member} odešel z hlasového kanálu`)
            .setColor('#fc2c03')
            logChannel.send(embed);

        mongoose.connect('mongodb://localhost:27017/UserStats', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
            if (err) {
                console.error(err)
                return
            }
        });
        var db = mongoose.connection;
        db.once('open', async function () {
            endTime = new Date().getTime();
            let timeDif = endTime - startTime;
            timeDif /= 1000;
            let seconds = Math.round(timeDif);

            userid = voiceState.member.id;
            let userDBId = await Stats.findOne({ userID: `${userid}` });

            if (userDBId) {
                setTimeout(async function () {
                    let userDBId = await Stats.findOneAndUpdate({ userID: `${userid}` }, { $inc: { timeInVoiceChatGeneral: `${seconds}` } });
                }, 500);                

            } else {
                var newStats = new Stats({
                    userID: userid,
                    timeInVoiceChatGeneral: 0,
                    timeInVoiceChatCzech: 0,
                    questions: 0,
                    answers: 0
                });
                newStats.save(function (err, stats) {
                    if (err) return console.error(err);
                });
                setTimeout(async function () {
                        let userDBId = await Stats.findOneAndUpdate({ userID: `${userid}` }, { $inc: { timeInVoiceChatGeneral: `${seconds}` } });
                })
            }
        })
    };
    */
}