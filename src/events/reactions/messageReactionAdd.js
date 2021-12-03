async function addRoleAndSend(member, role, channel) {
    if (role.name == "Beginner") {
        var level = "a beginner";
        var levelCzech = "začátečnickou";
    }else if (role.name == "Intermediate") {
        var level = "intermediate";
        var levelCzech = "středně pokročilou";
    }else if (role.name == "Advanced") {
        var level = "advanced";
        var levelCzech = "pokročilou";
    }else if (role.name == "Fluent") {
        var level = "fluent";
        var levelCzech = "plynnou";
    }else if (role.name == "Native Speaker") {
        var level = "a native speaker";
        var levelCzech = "rodilý mluvčí";
    }
    var channel = await global.findAChannel(1, channel.guild, "🤖bot");
    await channel.send(`${member}`).then(msg => { msg.delete().catch((e) => {}) })
    member.roles.add(role)
    var embed = new discord.MessageEmbed()
        .setColor(role.color)
        .addFields(
            { name: ':flag_gb:\u200B', value: `Now you're **${level}**! Congrats! :tada:\nHave you set your country with **/imfrom** yet?` },
            { name: ':flag_cz:\u200B', value: `Teď máš **${levelCzech}** úroveň! Gratuluji! :tada:\nUž sis nastavil svojí zemi s pomocí **/pochazimz**? ` }
        )
        .setFooter(member.displayName, member.user.displayAvatarURL());
    await channel.send(embed).then(msg => { msg.delete({ timeout: 30000 }).catch((e) => {}) })
}

module.exports = async (client, reaction, user1) => {
    var allowedEmojis1 = ["_beginner", "_intermediate", "_advanced", "_fluent", "_native_speaker"];
    if ((!(user1.bot))&&(reaction.message)&&(reaction.message.changeLevelMessage)) {
        var roles = global.sortByKey(await global.findRoles(reaction.message.guild, 0, ["Beginner", "Intermediate", "Advanced", "Fluent", "Native Speaker", "Learning Czech"]), "name");
        reaction.message.reactions.cache.forEach(async (reactionSet) => {
            if (!(allowedEmojis1.includes(reactionSet['_emoji']['name']))) { reactionSet.remove(); return; }
            if (reactionSet.count > 1) reactionSet.users.cache.forEach(async(user) => { if (!(user.id == client.user.id)) {
                member = await global.findMember(reaction.message.guild, user.id)
                reactionSet.users.remove(user.id)
                roles.forEach(async(role) => { if (member.roles.cache.has(role.id)) await member.roles.remove(role); })
                var roleName = reaction._emoji.name.substring(1);
                while (roleName.includes("_")) roleName = roleName.replace("_", " ");
                roles.forEach(async(role) => { if (role.name == global.titleCase(roleName.trim())) addRoleAndSend(member, role, reaction.message.channel); })
            }})
        })
    }
    var allowedEmojis2 = ['👍', '👎'];
    if ((!(user1.bot))&&(reaction.message)&&(reaction.message.poll)) {
        if (reaction.message.rigged) allowedEmojis2 = ['👍'];
        var roles = global.sortByKey(await global.findRoles(reaction.message.guild, 0, ["Beginner", "Intermediate", "Advanced", "Fluent", "Native Speaker", "Learning Czech"]), "name");
        duplicateUsers = [];
        usersReacted = [];
        reaction.message.reactions.cache.forEach(async (reactionSet) => {
            if (!(allowedEmojis2.includes(reactionSet['_emoji']['name']))) { reactionSet.remove(); return; }
            reactionSet.users.cache.forEach(async(user) => { if (!(user.id == client.user.id)) { if (usersReacted.includes(user.id)) { duplicateUsers.push(user.id); } else usersReacted.push(user.id); }})
        })
        reaction.message.reactions.cache.forEach(async (reactionSet) => { reactionSet.users.cache.forEach(async(user) => { if (!(user.id == client.user.id)) { if (duplicateUsers.includes(user.id)) reactionSet.users.remove(user.id); }}) })
    }

}
