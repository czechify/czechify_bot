const discord = require('discord.js');
const fs = require('fs')

module.exports = {
    run: async (client, message, args) => {
        let mentionedMember = message.mentions.users.first();

        let { cache } = message.guild.emojis;

        const yesEmoji = cache.find(emoji => emoji.name === "ooooo");
        const noEmoji = cache.find(emoji => emoji.name === "coooo");

        if (mentionedMember) {
            if (mentionedMember.id == message.author.id) {
                let embed = new discord.MessageEmbed();
                embed
                    .setDescription(`Nemůžeš si přece vzít sebe! ${noEmoji}`)
                    .setColor('#fafafa')
                    .setAuthor("COŽE!");
                message.channel.send(embed);
                return;
            }

            let acceptEmbed = new discord.MessageEmbed();
            acceptEmbed
                .setDescription(`${mentionedMember}, chceš si vzít ${message.author}?`)
                .setColor('#fafafa')
                .setAuthor("JŮŮŮŮ");
            let ReactionMessage = await message.channel.send(acceptEmbed);

            Reaction(ReactionMessage);

        } else {
            let embed = new discord.MessageEmbed();
            embed
                .setDescription(`Musíš **označit** svou lásku, ${message.author}!! <:uwu:743509835408081007>`)
                .setColor('#fafafa')
                .setAuthor("Skoro!");
            message.channel.send(embed);
        }


        async function Reaction(msg) {
            const time = 300000;
            msg.react(yesEmoji);
            msg.react(noEmoji);


            const filter = (reaction, user) => {
                if (reaction.emoji === undefined) {
                    return;
                } else {

                    return ["ooooo", "coooo"].includes(reaction.emoji.name) && user.id === mentionedMember.id;
                }
            };

            const collector = msg.createReactionCollector(filter, { time: time });

            collector.on('collect', async (reaction, reactionCollector) => {

                if (reaction.emoji.name === 'ooooo') {
                    collector.stop();
                    fs.readFile('./src/commands/member/stats.json', 'utf8', async function readFileCallback(err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            obj = JSON.parse(data);
                            if (obj[`${message.author.id}`]['brid'] == mentionedMember.id) {
                                let embed = new discord.MessageEmbed();
                                embed
                                    .setDescription(`Vždyt' jste se už vzali! ${noEmoji}`)
                                    .setColor('#fafafa')
                                    .setAuthor("COŽE!");
                                message.channel.send(embed);
                                return;
                            } else {
                                var category = client.channels.cache.find(role => role.name === "SVATBY");
                                let theChannel = await message.guild.channels.create(`Svatba ${message.guild.member(message.author).displayName} a ${message.guild.member(mentionedMember).displayName}`, {
                                    type: 'text',
                                    parent: category
                                });
                                setTimeout(() => { theChannel.delete() }, 300000);



                                let embed = new discord.MessageEmbed();
                                embed
                                    .setDescription(`Pojd'me do ${theChannel}! <:uwu:743509835408081007>`)
                                    .setColor('#fafafa')
                                    .setAuthor("JOOOO!!!!!");
                                message.channel.send(embed);

                                collector.on('end', collected => {
                                    return;

                                });
                                theChannel.send(`<@${message.author.id}> a <@${mentionedMember.id}>!`).then(msg => msg.delete());


                                setTimeout(() => { theChannel.send(`Dovolte, abych Vás přivítal v tento den, který je významný nejen pro Vás, ale i všechny zúčastněné. <:sipka:740627140814307450>`) }, 1000);

                                setTimeout(() => {
                                    theChannel.send(`Dnešní den patří k nejdůležitějším dnům ve Vašem životě. <:kul:741352093276700672>`)
                                }
                                    , 5000);
                                setTimeout(() => {
                                    theChannel.send(`Přichází velká odpovědnost, protože odedneška chcete jít dalším životem společně, věrně, v dobrém i ve zlém. <:uwu:743509835408081007>`)
                                }
                                    , 11000);
                                setTimeout(() => {
                                    theChannel.send(`A to je velmi mnoho a není to lehké. Máte ve svých rukou štěstí toho druhého, a ten od Vás očekává život plný lásky, tolerance a podpory. <:laaaaaskaaaaa:748295720272003152>\n\u200B`)
                                }
                                    , 17000);
                                setTimeout(() => {
                                    theChannel.send(`Milí snoubenci <:pika_sip:735501353383755858>,`)
                                }
                                    , 23000);

                                setTimeout(() => {
                                    theChannel.send(`jsem rád, že mohu být součástí Vašeho svatebního dne a pevně věřím, že budete v manželství šťastní a spokojení. <:miowink:735501353258057858>`)
                                }
                                    , 27000);
                                setTimeout(() => {
                                    theChannel.send(`Věřím, že Vaše společná cesta životem bude šťastnou a přesně takovou, o jaké jste snili. <:mmmm:740999796038434956>`)
                                }
                                    , 33000);
                                setTimeout(() => {
                                    theChannel.send(`Manželství je vážná věc. <:pikawoah:735501352658272307>`)
                                }
                                    , 37000);
                                setTimeout(() => {
                                    theChannel.send(`Jste připraveni dát si navzájem přísahu lásky a věrnosti snadno a bez váhání? <:stare:736560671247826965>`)
                                }
                                    , 39000);
                                setTimeout(() => {
                                    theChannel.send(`<@${mentionedMember.id}>?`);

                                    const msgcol = new discord.MessageCollector(theChannel, m => m.author.id === mentionedMember.id, { time: 600000 });
                                    msgcol.on('collect', async m => {
                                        if (m.content.toLowerCase().includes('ano') && m.author.id === mentionedMember.id || m.content.toLowerCase().includes("áno") && m.author.id === mentionedMember.id) {
                                            msgcol.stop();
                                            theChannel.send(`<@${message.author.id}>?`)
                                            const msgcol2 = new discord.MessageCollector(theChannel, m => m.author.id === message.author.id, { time: 600000 });
                                            msgcol2.on('collect', async m => {
                                                if (m.content.toLowerCase().includes('ano') && m.author.id === message.author.id || m.content.toLowerCase().includes("áno") && m.author.id === message.author.id) {
                                                    msgcol2.stop();
                                                    theChannel.send(`S velkou radostí vás prohlašuji za manžele. <:joooo:735501352792227845>`)
                                                    setTimeout(() => {
                                                        theChannel.send(`Nyní se prosím polibte! <:senko_loaf:735501352947417151>`);
                                                        let embed = new discord.MessageEmbed();
                                                        embed
                                                            .setDescription(`${message.author} a ${mentionedMember} se vdali!!! <:mrrrrr:739946243706322944>`)
                                                            .setColor('#fafafa')
                                                            .setAuthor("HURÁÁÁÁÁ!!!!!");
                                                        message.channel.send(embed);
                                                        
                                                        let mauthID = obj[`${message.author.id}`]['brid'];
                                                        let mentID = obj[`${mentionedMember.id}`]['brid'];

                                                        var newObj = {
                                                            "id": member.id,
                                                            "messagecount": 0,
                                                            "lastmessage": "1598530409921",
                                                            "brid": "null"
                                                        }
                                                
                                                            try {
                                                                obj[mentID]['brid'] = "null";
                                                            }catch{
                                                                obj[mentID] = newObj ;
                                                            }
                                                            try {
                                                                obj[mauthID]['brid'] = "null";
                                                            }catch{
                                                                obj[mauthID] = newObj;
                                                            }

                                                        obj[`${message.author.id}`]['brid'] = mentionedMember.id;
                                                        obj[`${mentionedMember.id}`]['brid'] = message.author.id;


                                                        
                                                        json = JSON.stringify(obj, null, 4);
                                                        fs.writeFile('./src/commands/member/stats.json', json, 'utf8', (err, content) => {
                                                            if (err) {
                                                                console.log("File read failed:", err)
                                                                return
                                                            }
                                                        })

                                                    }


                                                        , 2000);
                                                } else if (m.content.toLowerCase().includes('ne') && m.author.id === message.author.id || m.content.toLowerCase().includes("nie") && m.author.id === message.author.id) {
                                                    msgcol.stop();
                                                    let embed = new discord.MessageEmbed();
                                                    embed
                                                        .setDescription(`Proč mě tedy otravujete 🤦‍♂️`)
                                                        .setColor('#fafafa')
                                                        .setAuthor("Tak nic");
                                                    theChannel.send(embed);
                                                    return;
                                                }
                                            });
                                        } else if ((m.content.toLowerCase().includes('ne') && mentionedMember.id === message.author.id) || (m.content.toLowerCase().includes("nie") && m.author.id === mentionedMember.id)) {
                                            msgcol.stop();
                                            let embed = new discord.MessageEmbed();
                                            embed
                                                .setDescription(`Proč mě tedy otravujete 🤦‍♂️`)
                                                .setColor('#fafafa')
                                                .setAuthor("Tak nic");
                                            theChannel.send(embed);
                                            return;

                                        }
                                    })
                                }, 42000)
                            }
                        }

                    })
                }
                else if (reaction.emoji.name === 'coooo') {
                    msg.delete();
                    let embed = new discord.MessageEmbed();
                    embed
                        .setDescription(`${message.author} a ${mentionedMember} se nevdali!!! <:senko_loaf:735501352947417151>`)
                        .setColor('#fafafa')
                        .setAuthor("TAK NIC!!!!!");
                    message.channel.send(embed);
                }
                collector.on('end', collected => {
                    return;

                });
            })
        }


    },
    aliases: ['vzít si', 'vdát se', 'prožít celý život s']
}