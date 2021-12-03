const messagecount = require('./../../commands/member/messagecount');

const PREFIX = process.env.PREFIX;


module.exports = (client, message) => {
    var common = require('./../../commands/member/messagecount');

    if(message.author.bot) return;
    if(!message.content.startsWith(PREFIX)) {
        common.do(message);

        if (message.channel.id === '735043848757051467') {
            common.foo(message);
        }
        if (message.content.toLowerCase() == "bote"){
            message.channel.send("No?");
            return;
        }
        else if (message.content.toLowerCase().includes("bote")){
            common.ans(message);
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
