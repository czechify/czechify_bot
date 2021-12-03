const cachedMessageReactions = new Map();


module.exports = async(client, member, user) => {



    // let removeMemberRole = (emojiRoleMappings) => {
    //     if(emojiRoleMappings.hasOwnProperty(reaction.emoji.id)) {
    //         let roleId = emojiRoleMappings[reaction.emoji.id];
    //         let role = reaction.message.guild.roles.cache.get(roleId);
    //         let member = reaction.message.guild.roles.cache.get(user.id);
    //         if (role && member) {
    //             member.roles.remove(role);
    //         }
    //     }
    // }
    // if(reaction.message.partial){
    // await reaction.message.fetch();
    //     let { id } = reaction.message;
    //     try {
    //         let msgDocument = await MessageModel.findOne({ messageId: id });
    //         if(msgDocument) {
    //             cachedMessageReactions.set(id, msgDocument.emojiRoleMappings);
    //             let { emojiRoleMappings } = msgDocument;
    //             removeMemberRole(emojiRoleMappings);
    //         }
    //     }
    //         catch(err) {
    //             console.log(err);
    //         }
    //     }
    //     else {
    //         let emojiRoleMappings = cachedMessageReactions.get(reaction.message.id);
    //         addMemberRole(emojiRoleMappings);
    //     }
}

