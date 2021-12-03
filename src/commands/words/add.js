const fetch = require('node-fetch');

module.exports = {
    run: async (client, message, args) => {
        message.delete();
        if (global.allowedUsers.includes(message.author.id)) {
            var response = await fetch("https://martinnaj27707.ipage.com/martin/partners/plankto/?action=newWord&wordEnglish=" + args.join(" ").split(", ")[1] + "&wordCzech=" + args.join(" ").split(", ")[0] + "&value=" + args.join(" ").split(", ")[2]).then(res => res.text())
            if (response == "Complete") {
                msg = message.channel.send("Done")
                msg.then((msg) => { setTimeout(function() { msg.delete().catch((e) => {}) }, 5000); })
            }else{
                msg = message.channel.send(response)
                msg.then((msg) => { setTimeout(function() { msg.delete().catch((e) => {}) }, 5000); })
            }
        }else{
            let embed = new discord.MessageEmbed()
                .setDescription("**Podvodníku**")
                .setColor('#ff3c36')
                .setAuthor(`Nech toho!`)
                .setThumbnail("https://i.imgur.com/AveAmWu.gif");
            message.channel.send(embed).then(msg => { msg.delete({ timeout: 5000 }).catch((e) => {}) });
            message.delete();
        }
    },
    descriptionCZ: "Přidat nové slovo do databáze",
    descriptionEN: "Add a new word to the database",
    allowedIn: ["guild", "dm"],
    czAlias: "přidatslovo",
    aliases: ['add', "newword", "defineword", "pridatslovo"]
}
