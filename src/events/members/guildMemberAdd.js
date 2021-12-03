const discord = require('discord.js');

module.exports = async (client, member) => {
    let welcomeMsg = new discord.MessageEmbed()
            .setColor('#ffa530')
            .setTitle(`Vítej, ${member.displayName}!`)
            .setDescription(`:flag_cz: __**Vítám tě na ČEŠTINĚ**__!

•  Pro začátek si nastav úroveň češtiny a svou rodnou zemi!
•  Neboj se kdykoli napsat do <#433946325969797133>, zeptat v <#434230418334547968> nebo se připojit do hlasového kanálu!
•  V <#694916140404834415> se můžeš učit nová slovíčka s pomocí **/slovo**!
•  Jestli budeš potřebovat pomoc napiš <@243425689376653312> nebo <@298873046696067072>!
    


:flag_gb: __**Welcome to CZECH**__!

•  Firstly, set your Czech level and your country!
•  Don't be afraid to write to <#433946325969797133> at any time, ask in <#434230418334547968> or join the voice channel!
•  In <#694916140404834415> you can learn new vocabulary with **/word**!
•  If you need help message <@243425689376653312> or <@298873046696067072>!`);
    member.send(welcomeMsg);
    const channel = member.guild.channels.cache.find(ch => ch.name === '👋vitejte');
    channel.send(`Vítej ${member}!`).then(msg => msg.delete());
    let learningRole = member.guild.roles.cache.find(role => role.name === "Learning Czech");
    member.roles.add(learningRole);

    Log(member);
    let { cache } = member.guild.emojis;
        const beginnerEmoji = cache.find(emoji => emoji.name === "_beginnner");
        const intermediateEmoji = cache.find(emoji => emoji.name === "_intermediate");
        const advancedEmoji = cache.find(emoji => emoji.name === "_advanced");
        const fluentEmoji = cache.find(emoji => emoji.name === "_fluent");
        const nativeSpeakerEmoji = cache.find(emoji => emoji.name === "_native_speaker");

        const beginnerRole = member.guild.roles.cache.find(role => role.name === "Beginner");
        const intermediateRole = member.guild.roles.cache.find(role => role.name === "Intermediate");
        const advancedRole = member.guild.roles.cache.find(role => role.name === "Advanced");
        const fluentRole = member.guild.roles.cache.find(role => role.name === "Fluent");
        const nativeSpeakerRole = member.guild.roles.cache.find(role => role.name === "Native Speaker");
        let czechRepublicRole = member.guild.roles.cache.find(role => role.name === "Czech Republic");
        let learningCzechRole = member.guild.roles.cache.find(role => role.name === "Learning Czech");

        let embedCzech = new discord.MessageEmbed()
            .setColor('#ffa530')
            .setTitle(`Vítej ${member.displayName}!`)
            .setDescription(`__React to the message to choose your level!__\n\u200b`)
            .addFields(
                { name: `${beginnerEmoji} **Beginner** - I'm just starting to learn`, value: `${beginnerEmoji} **Začátečník** - Teprve se začínám učit`},
                { name: '\u200B', value: '\u200B' },
                { name: `${intermediateEmoji} **Intermediate** - I can construct sentences`, value: `${intermediateEmoji} **Středně pokročilá** - Umím sestavovat věty` },
                { name: '\u200B', value: '\u200B' },
                { name: `${advancedEmoji} **Advanced** - Talking isn't a problem for me`, value: `${advancedEmoji} **Pokročilá** - Mluvení pro mne není problém`},
                { name: '\u200B', value: '\u200B' },
                { name: `${fluentEmoji} **Fluent** - Czech is my second self`, value: `${fluentEmoji} **Plynná** - Čeština je mé druhé já` },
                { name: '\u200B', value: '\u200B' },
                { name: `${nativeSpeakerEmoji} **Native speaker** - That's apparent :sunglasses:`, value: `${nativeSpeakerEmoji} **Rodilý mluvčí** - No to je jasné :sunglasses:` },
                )

            .setThumbnail(member.user.displayAvatarURL());
        
        

        let ReactionMessage = await channel.send(embedCzech);
        const time = 1800000 //amount of time to collect for in milliseconds
        Reaction(ReactionMessage);

        async function Reaction(msg) {
            msg.react(beginnerEmoji);
            msg.react(intermediateEmoji);
            msg.react(advancedEmoji);
            msg.react(fluentEmoji);
            msg.react(nativeSpeakerEmoji);


            const filter = (reaction, user) => {
                return ["_beginnner", "_intermediate", "_advanced", "_fluent", "_native_speaker"].includes(reaction.emoji.name) && user.id === member.id;
            };

            const collector = msg.createReactionCollector(filter, { time: time });
            
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
                                        AnswerEmbed("a beginner", "začátečnickou", "#34ff2f");
                                        msg.delete();
                                    }
                                    else if (reaction.emoji.name === '_intermediate') {
                                        user.roles.add(intermediateRole);
                                        AnswerEmbed("intermediate", "středně pokročilou", "#ecff48");
                                        msg.delete();
                                    } else if (reaction.emoji.name === '_advanced') {
                                        user.roles.add(advancedRole);
                                        AnswerEmbed("advanced", "pokročilou", "#ffac40");
                                        msg.delete();
                                    } else if (reaction.emoji.name === '_fluent') {
                                        user.roles.add(fluentRole);
                                        AnswerEmbed("fluent", "plynulou", "#f7681b");
                                        msg.delete();
                                    } else if (reaction.emoji.name === '_native_speaker') {
                                        user.roles.add(nativeSpeakerRole);
                                        user.roles.add(czechRepublicRole);

                                        let embed = new discord.MessageEmbed()
                                            .setColor("#44f0fc")
                                            .addFields(
                                                { name: ':flag_cz:\u200B', value: `Jsi **rodilý mluvčí**! Dobrá práce! :+1:` },
                                                { name: ':flag_gb:\u200B', value: `You're a **native speaker**! Good job! :+1:` }
                                            )
                                            //.setThumbnail(member.user.displayAvatarURL());
                                            .setFooter(member.displayName, member.user.displayAvatarURL());

                                        channel.send(embed);
                                        msg.delete();
                                    }
                        });
                        
                        collector.on('end', collected => {
                            return;
                            
                            });

            function AnswerEmbed(level, levelCzech, color) {
                let embed = new discord.MessageEmbed()
                    .setColor(color)
                    .addFields(
                        { name: ':flag_cz:\u200B', value: `Teď máš **${levelCzech}** úroveň! Gratuluji! :tada:\nMůžeš si vybrat zemi s pomocí **/pochazimz [název země anglicky]**!` },
                        { name: ':flag_gb:\u200B', value: `Now you're **${level}**! Congrats! :tada:\nYou can choose your country by writing **/imfrom [country name in English]**!` }
                    )
                    .setFooter(member.displayName, member.user.displayAvatarURL());
                    channel.send(embed);
            }
            channel.send("Vítej <@" + member.user.id + ">").then(message => message.delete());

        };

        function Log(member) {
            const logChannel = client.channels.cache.find(channel => channel.name === "🗒logs");
            let embed = new discord.MessageEmbed();
                embed
                .setDescription(`__Uživatel ${member} se přidal__\nID: ${member.id}\nÚčet vznikl ${member.user.createdAt.toISOString().replace('-', '/').split('T')[0].replace('-', '.')}`)
                .setColor('#34ff2f')
                logChannel.send(embed);
        }
}