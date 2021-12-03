
const discord = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        let { cache } = message.guild.emojis;

        Czech();
        async function Czech() {
            let embedCZ = new discord.MessageEmbed()
                .setColor('#ffa530')
                .setTitle(`Příkazy na serveru`)
                .setDescription(`__Co umí náš bot?__\n\u200b`)
                .addFields(
                    { name: `Zábava :smile:`, value: `**/citát** (quote, isaid)\n**/hod** - hodí kostku\n**/předatvlastnictví** - Jenom pro majitele!\n` },
                    { name: '\u200B', value: '\u200B' },
                    { name: `Užitečné věci :tools:`, value: `**/úroven** - change your current Czech level\n**/tr [věta]** - Přelož **cokoliv** :open_mouth:\n**/omně** - Podívej se, jak se ti daří\n**/hlasování** [dotaz] - Začni hlasování!\n**/hlas** - Získej roli **Voice Chat**` },
                    { name: '\u200B', value: '\u200B' },
                    { name: `Slovíčka <:cz_check:499237381635964929>`, value: `**/hrát** - Hraj hru se slovy!\n**/slovo** - Získat nové slovo\n**/mojeslova** - Užij si svojí sbírku slov\n**/trh** - Vyměň svá jednoduchá slova na složitá\n\n:point_down: English translation`});
            let msgcz = await message.channel.send(embedCZ);
            msgcz.react("🇬🇧");

            const time = 500000; //amount of time to collect for in milliseconds

            const filter = (reaction, user) => {
                return ["🇬🇧"].includes(reaction.emoji.name) && user.id === message.author.id;
            }
            const collector = msgcz.createReactionCollector(filter, { time: time });

            collector.on('collect', async (reaction, reactionCollector) => {

                if (reaction = '🇬🇧') {
                    English();
                    msgcz.delete();

                }
            });
        };



        async function English() {
            let embedEN = new discord.MessageEmbed()
                .setColor('#ffa530')
                .setTitle(`Server commands`)
                .setDescription(`__What can our bot do?__\n\u200b`)
                .addFields(
                    { name: `Fun :smile:`, value: `**/quote** (citat, isaid)\n**/dice** (hod) - Throws the dice\n**/transferownership** - Only for the owner!` },
                    { name: '\u200B', value: '\u200B' },
                    { name: `Usefulness :tools:`, value: `**/level** - Change your current Czech level\n**/tr [sentence]** translate **anything** :open_mouth:\n**/stats** - Check how you're doing\n**/poll** [question] - Start a poll!\n**/voice** - Get the **Voice Chat** role` },
                    { name: '\u200B', value: '\u200B' },
                    { name: `Words <:cz_check:499237381635964929>`, value: `**/play** - Play the word game!\n**/word** - Get a new word\n**/mywords** - Enjoy your word collection\n**/market** - Trade easy words for harder ones\n\n:point_down: Český překlad`});
                
            let msgen = await message.channel.send(embedEN);

            msgen.react("🇨🇿");
            const time = 60000; //amount of time to collect for in milliseconds

            const filter = (reaction, user) => {
                return ["🇨🇿"].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            const collector = msgen.createReactionCollector(filter, { time: time });

            collector.on('collect', async (reaction, reactionCollector) => {

                if (reaction = '🇨🇿') {
                    Czech();
                    msgen.delete();
                }
            });
        }

    },
    aliases: ['pomoc']
}