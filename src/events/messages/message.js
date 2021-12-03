const PREFIX = process.env.PREFIX;
const thanksWords = ["thanks", "thank you","díky", "děkuji", "thnx", "thx", "thnks", "děkuju", "спс", "спасибо", "спасибочки", "спасиб", "пасиб", "thnk", "thks" ];

module.exports = (client, message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(PREFIX)) {
        if(thanksWords.some(word => message.content.toLowerCase().includes(word))){
            client.commands.get("thanks")(client, message);
            return;
        }else if(message.content == "!d bump") {
            client.commands.get("bumpreminder")(client, message);
            return;
        }
    }else{
        let cmdName = message.content.substring(message.content.indexOf(PREFIX)+1).split(new RegExp(/\s+/)).shift();
        let argsToParse = message.content.substring(message.content.indexOf(' ')+1);
        if(client.commands.get(cmdName)) {
            client.commands.get(cmdName)(client, message, argsToParse);
        }
        else{
            console.log("Příkaz neexistuje");
        }
    }
    
};
