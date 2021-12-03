const discord = require('discord.js');
const CheckPermissionsRole = (role) => role.permissions.has('ADMINISTRATOR') || role.permissions.has('KICK_MEMBERS') || role.permissions.has('BAN_MEMBERS') || role.permissions.has('MANAGE_GUILD') || role.permissions.has('MANAGE_CHANNELS') || role.permissions.has('MUTE_MEMBERS');

module.exports = {
    run: async (client, message, args) => {
        if (args == message.content) {
            message.delete();
            let embed = new discord.MessageEmbed()
                .setColor("#ffa530")
                .addFields(
                    { name: ':flag_cz:\u200B', value: `Musíš napsat jména rolí přes čárku!` },
                    { name: ':flag_gb:\u200B', value: `Write the names of the roles with comma!` }
                )
                .setThumbnail("https://i.imgur.com/5UxthxL.png");
            message.channel.send(embed)
                .then(msg => msg.delete({ timeout: 5000 }));
        } else {
            let roleNames = args.split(", ");
            let roleSet = new Set(roleNames);
            let { cache } = message.guild.roles;

            roleSet.forEach(roleName => {
                let role = cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());
                if (role) {
                    if (message.member.roles.cache.has(role.id)) {
                        EmbedAlreadyHas(role);
                        return;
                    }
                    if (CheckPermissionsRole(role)) {
                        message.channel.send(`Nemůžeš si dát roli **${role}** ty podvodníku !OwO!`);
                    }
                    else {
                        message.member.roles.add(role)
                            .then(EmbedSuccess(role))
                            .catch(err => {
                                console.log(err);
                                message.channel.send("Něcos pokazil! Dobrá práce!");
                            });
                    }
                }
                else {
                    EmbedDoesntExist(roleName)
                }
            });
        }


        function EmbedSuccess(role) {
            let embed = new discord.MessageEmbed()
                .setColor("#ffa530")
                .addFields(
                    { name: ':flag_cz:\u200B', value: `Přidal sis roli ${role}!` },
                    { name: ':flag_gb:\u200B', value: `You added the role ${role}!` }
                )
            message.channel.send(embed);
        }
        function EmbedAlreadyHas(role){
            let embed = new discord.MessageEmbed()
            .setColor("#ffa530")
            .addFields(
                { name: ':flag_cz:\u200B', value: `Vždyť už máš roli ${role}!` },
                { name: ':flag_gb:\u200B', value: `You already have the role ${role}!` }
            )
            message.channel.send(embed);
            }
        function EmbedDoesntExist(role) {
            let embed = new discord.MessageEmbed()
                .setColor("#ffa530")
                .addFields(
                    { name: ':flag_cz:\u200B', value: `Role **${role}** není!` },
                    { name: ':flag_gb:\u200B', value: `**${role}** role doesn't exist!` }
                )
            message.channel.send(embed);
        }
    }
    ,
    aliases: ['addrole', 'giverole', 'roleadd', 'rolegive']
}

