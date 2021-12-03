const discord = require('discord.js');


module.exports = {
    run: async (client, message, args) => {
        /*
        if (talkedRecently.has(message.author.id)) {
            let embed = new discord.MessageEmbed()
                .setColor("#ff3c36")
                .addFields(
                    { name: ':flag_gb:\u200B', value: `Don't thank so often please! :scream:` },
                    { name: ':flag_cz:\u200B', value: `Neděkuj tak často prosím! :scream:` }
                )
                message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                message.delete();
        } else {

        
            mongoose.connect('mongodb://localhost:27017/UserStats', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
                if (err) {
                    console.error(err)
                    return
                }
            });

            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));

            db.once('open', async function () {
                console.log("Connection Successful!");
                if (!message.mentions.users.first()) {
                    let embed = new discord.MessageEmbed()
                        .setColor("#ffa530")
                        .addFields(
                            { name: ':flag_gb:\u200B', value: `Please mention who you want to thank! (one person)`},
                            { name: ':flag_cz:\u200B', value: `Prosím označ komu děkuješ! (jednoho člověka)` },
                        )
                        message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                    return;
                } else {
                let messageAuthor = message.author.id;
                let mentionedUser = message.mentions.users.first().id;
                console.log(mentionedUser);
                let userDBId = await Stats.findOne({ userID: `${messageAuthor}` });
                let mentionedUserDBId = await Stats.findOne({ userID: `${mentionedUser}` });
                
                //console.log(userDBId);
                //console.log(mentionedUserDBId);
                
                    talkedRecently.add(message.author.id);
                    setTimeout(() => {
                      talkedRecently.delete(message.author.id);
                    }, 60000);
                    if (messageAuthor === mentionedUser){
                        let embed = new discord.MessageEmbed()
                        .setColor("#ffa530")
                        .addFields(
                            { name: ':flag_gb:\u200B', value: `Who thanks themselves? <:thinkingbeer:456741880923947010>`},
                            { name: ':flag_cz:\u200B', value: `Kdo děkuje sám sobě? <:thinkingbeer:456741880923947010>` },
                        )
                        message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                    }else{
                    if (userDBId && mentionedUserDBId) {
                        console.log("first");
                        SaveToDB(messageAuthor, mentionedUser);

                    } else {
                        
                        if (!userDBId) {
                            var newStats = new Stats({
                                userID: messageAuthor,
                                timeInVoiceChatGeneral: 0,
                                timeInVoiceChatCzech: 0,
                                questions: 0,
                                answers: 0
                            });
                            newStats.save(function (err, stats) {
                                if (err) return console.error(err);
                                //console.log(stats.userID + " saved to collection.");
                            });

                        }
                        if (!mentionedUserDBId) {
                            var newStats = new Stats({
                                userID: mentionedUser,
                                timeInVoiceChatGeneral: 0,
                                timeInVoiceChatCzech: 0,
                                questions: 0,
                                answers: 0
                            });

                            newStats.save(function (err, stats) {
                                if (err) return console.error(err);
                                //console.log(stats.userID + " saved to collection.");
                            });
                        }
                        setTimeout(function() {
                            SaveToDB(messageAuthor, mentionedUser)                      
                        }, 500);
                    }

                }
            }
                async function SaveToDB(questioner, answerer) {

                    let answers = await Stats.findOneAndUpdate({ userID: answerer }, { $inc: { answers: 1 } }, {new: true});
                    let questions = await Stats.findOneAndUpdate({ userID: questioner }, { $inc: { questions: 1 } }, {new: true});
                    
                    let embed = new discord.MessageEmbed()
                    .setColor("#ffa530")
                    .addFields(
                        { name: ':tada: <:cz_heart:499237225406398464>', value: `\u200B\n**${message.guild.members.cache.get(answerer).displayName}** • ${answers.answers} <:cz_check:499237381635964929>\n**${message.guild.members.cache.get(questioner).displayName}** • ${questions.questions} <:cz_what:499237344478625832>` },
                    )
                    message.channel.send(embed);

                }
            });
        }
        */
    },
    aliases: [""]
}
