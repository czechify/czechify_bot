const discord = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        if (args == message.content) {
            message.delete();
            let embed = new discord.MessageEmbed()
                .setColor("#ffa530")
                .addFields(
                    { name: ':flag_cz:\u200B', value: `Musíš napsat jméno země anglicky!` },
                    { name: ':flag_gb:\u200B', value: `Write the name of your country in English!` }
                )
                .setThumbnail("https://i.imgur.com/5UxthxL.png");
            message.channel.send(embed)
                .then(msg => msg.delete({ timeout: 5000 }));
        } else {
            let roleName = args;
            let { cache } = message.guild.roles;

            let role = cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());
            const firstCountry = cache.find(r => r.name === "Canada");

            if (role) {

                if (role.comparePositionTo(firstCountry) <= 0) {
                    if (message.member.roles.cache.has(role.id)) {
                        let embed = new discord.MessageEmbed()
                            .setColor('#ffa530')
                            .setAuthor(`You're already from ${role.name}`)
                            .setFooter(message.member.displayName, message.member.user.displayAvatarURL());
                        message.channel.send(embed);
                        message.delete();
                        return;
                    }

                    let roleNames = message.member.roles;
                    if (roleNames) {
                        roleNames.cache.array().forEach(oldRole => {

                            if (oldRole.comparePositionTo(firstCountry) <= 0) {
                                if (message.member.roles.cache.has(oldRole.id)) {
                                    message.member.roles.remove(oldRole)
                                        .catch(err => {
                                            AddRole(role);
                                        });
                                }
                            } else {
                            }
                        });
                    }

                    function Embed(role) {
                        let embed = new discord.MessageEmbed()
                            .setDescription(`You're from ${role}! Congrats! :tada:`)
                            .setColor('#ffa530')
                            .setAuthor("WOW")
                            .setThumbnail(message.member.user.displayAvatarURL());
                        message.channel.send(embed);
                    }
                    function AddRole(theRole) {
                        message.member.roles.add(theRole)
                            .then(
                                Embed(theRole)
                            )
                            .catch(err => {
                                console.log(err);
                                message.channel.send("Něcos pokazil! Dobrá práce!");

                            });
                    }

                } else {
                    message.channel.send(`Vždyť to není země...`);
                }
            }
            else {
                message.channel.send(`Země **${roleName}** není v seznamu! :scream: Píšu adminovi...`)
                    .then(setTimeout(function () { message.channel.send("Hotovo :relieved:") }, 5000));
            };
        }
        
    },
    aliases: ['jsemz', 'pochazimz', 'iamfrom']
}