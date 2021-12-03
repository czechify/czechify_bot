const discord = require('discord.js');
const { count } = require('console');
const fetch = require('node-fetch');


module.exports = {
    run: async (client, message, args) => {
        let messageAuthor = message.author.id;

        var userData = await fetch("https://najemi.cz/partners/plankto/?action=getUserData&userID=" + messageAuthor).then(res => res.text())

        userData = JSON.parse(userData);

        var allWords = userData['words'];

        console.log(allWords)

                if (!userWords){
                    wcount = 0;
                    ccount = 0
                }else{
                let allWords = userWords.wordIds.toString().split(',');
                    wcount = allWords.length;
                    ccount = userWords.score;
                }
                if (!userDB){
                    qcount = 0;
                    acount = 0;
                    hours = `00:00 😦`;
                }else{
                    qcount = userDB.questions;
                    acount = userDB.answers;
                    let totalSeconds = userDB.timeInVoiceChatGeneral;
                    hours = convertHMS(totalSeconds);
                }

                let embed = new discord.MessageEmbed()
                    .setColor("#ffa530")
                    .setTitle(`__${message.member.displayName}__`)
                    .addFields(
                        { name: '**🔊 Čas praktiky**', value: `\n🕑 ${hours}\n\u200B` },
                        { name: '**<:cz_check:499237381635964929> Slova**', value: `\n **${wcount}** slov\n**${ccount}** Čechízů\n\u200B` },
                        { name: '😎 Aktivita', value: `**<:cz_what:499237344478625832>Otázek:** ${qcount}\n**<:cz_check:499237381635964929>Odpovědí:** ${acount}` }
                    )
                    //.setFooter(message.member.displayName)

                    .setThumbnail(message.author.displayAvatarURL());


                message.channel.send(embed);

                //console.log(userDB.questions)


        message.delete();
        function convertHMS(value) {
            const sec = parseInt(value, 10); // convert value to number if it's string
            let hours   = Math.floor(value / 3600); // get hours
            minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            return hours+':'+minutes;
            }
    },
    aliases: [/*'omne', 'omně', 'aboutme', 'profile'*/]
}