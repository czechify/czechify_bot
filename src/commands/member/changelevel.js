
const discord = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        let { cache } = message.guild.emojis;

        const beginnerEmoji = cache.find(emoji => emoji.name === "_beginnner");
        const intermediateEmoji = cache.find(emoji => emoji.name === "_intermediate");
        const advancedEmoji = cache.find(emoji => emoji.name === "_advanced");
        const fluentEmoji = cache.find(emoji => emoji.name === "_fluent");
        const nativeSpeakerEmoji = cache.find(emoji => emoji.name === "_native_speaker");

        
        const beginnerRole = message.guild.roles.cache.find(role => role.name === "Beginner");
        const intermediateRole = message.guild.roles.cache.find(role => role.name === "Intermediate");
        const advancedRole = message.guild.roles.cache.find(role => role.name === "Advanced");
        const fluentRole = message.guild.roles.cache.find(role => role.name === "Fluent");
        const nativeSpeakerRole = message.guild.roles.cache.find(role => role.name === "Native Speaker");
        let learningCzechRole = message.guild.roles.cache.find(role => role.name === "Learning Czech");


        let embed = new discord.MessageEmbed()
            .setColor('#ffa530')
            .setDescription(`__Zareáguj na zprávu pro zvolení své úrovně!__\n\u200b`)
            .addFields(
                { name: `${beginnerEmoji} **Beginner** - I'm just starting to learn`, value: `${beginnerEmoji} **Začátečník** - Teprve se začínám učit` },
                { name: '\u200B', value: '\u200B' },
                { name: `${intermediateEmoji} **Intermediate** - I can construct sentences`, value: `${intermediateEmoji} **Středně pokročilá** - Můžu sestavovat věty` },
                { name: '\u200B', value: '\u200B' },
                { name: `${advancedEmoji} **Advanced** - Talking isn't a problem for me`, value: `${advancedEmoji} **Pokročilá** - Mluvení pro mne není problém` },
                { name: '\u200B', value: '\u200B' },
                { name: `${fluentEmoji} **Fluent** - Czech is my second self`, value: `${fluentEmoji} **Plynná** - Čeština je mé druhé já` },
                { name: '\u200B', value: '\u200B' },
                { name: `${nativeSpeakerEmoji} **Native speaker** - That's apparent :sunglasses:`, value: `${nativeSpeakerEmoji} **Rodilý mluvčí** - No to je jasné :sunglasses:` },
            )

        function AnswerEmbed(level, levelCzech, color) {
            let embed = new discord.MessageEmbed()
                .setColor(color)
                .addFields(
                    { name: ':flag_gb:\u200B', value: `Now you're **${level}**! Congrats! :tada:\nDid you set your country with **/imfrom** yet?` },
                    { name: ':flag_cz:\u200B', value: `Teď máš **${levelCzech}** úroveň! Gratuluji! :tada:\nUž sis nastavil svojí zemi s pomocí **/pochazimz**? ` }
                )
                .setFooter(message.member.displayName, message.author.displayAvatarURL());
                message.channel.send(embed);
        }


        let ReactionMessage = await message.channel.send(embed);
        const time = 600000 //amount of time to collect for in milliseconds
        Reaction(ReactionMessage);

        async function Reaction(msg) {
            msg.react(beginnerEmoji);
            msg.react(intermediateEmoji);
            msg.react(advancedEmoji);
            msg.react(fluentEmoji);
            msg.react(nativeSpeakerEmoji);
        }

            const filter = (reaction, user) => {
                return ["_beginnner", "_intermediate", "_advanced", "_fluent", "_native_speaker"].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            const collector = ReactionMessage.createReactionCollector(filter, { max: 1,time: time });

            collector.on('collect', (reaction, reactionCollector) => {
                let user = reaction.message.guild.members.cache.get(reactionCollector.id);
                let roleNames = user.roles;
                if (roleNames) {
                    roleNames.cache.array().forEach(oldRole => {

                        if (oldRole.id === beginnerRole.id || oldRole.id === intermediateRole.id || oldRole.id === advancedRole.id || oldRole.id === fluentRole.id || oldRole.id === nativeSpeakerRole.id || oldRole.id === learningCzechRole.id && oldRole.name != '@everyone') {
                                    
                                user.roles.remove(oldRole);
                        }})
                    };
                        
                                    if (reaction.emoji.name === '_beginnner') {
                                        user.roles.add(beginnerRole);
                                        AnswerEmbed("a beginner", "začátečnickou", "#41d13e");

                                    }
                                    else if (reaction.emoji.name === '_intermediate') {
                                        user.roles.add(intermediateRole);
                                        AnswerEmbed("intermediate", "středně pokročilou", "#ff8b00");


                                    } else if (reaction.emoji.name === '_advanced') {
                                        user.roles.add(advancedRole);
                                        AnswerEmbed("advanced", "pokročilou", "#f0ff64");


                                    } else if (reaction.emoji.name === '_fluent') {
                                        user.roles.add(fluentRole);
                                        AnswerEmbed("fluent", "plynnou", "#f0ff64");


                                    } else if (reaction.emoji.name === '_native_speaker') {
                                        user.roles.add(nativeSpeakerRole);
                                        
                                        let embed = new discord.MessageEmbed()
                                            .setColor("#88dce7")
                                            .addFields(
                                                { name: ':flag_cz:\u200B', value: `Jsi **rodilý mluvčí**! Dobrá práce! :+1:` },
                                                { name: ':flag_gb:\u200B', value: `You're a **native speaker**! Good job! :+1:` }
                                            )
                                            .setFooter(message.member.displayName, message.author.displayAvatarURL());
                                            message.channel.send(embed);
                                            ReactionMessage.delete();
                                            return;
                                    }
                                    ReactionMessage.delete();
                        });
                        
                        collector.on('end', collected => {
                            
                            return;
                
                            });
    


            
    // message.delete().catch(err => {
    //     console.log("message");
    // });
    },
    aliases: ['uroven', 'level', 'lvl', 'úroveň']
}