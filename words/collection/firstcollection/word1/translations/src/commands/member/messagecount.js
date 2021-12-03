const discord = require('discord.js');
const client = new discord.Client();
const fs = require('fs');
const message = require('./../../events/messages/message');

var count = 0;

  module.exports = {
 
    run: async(client, message, args)  => {
        let Channel = message.guild.channels.cache.find(role => role.name === "🤗︴baveníčko");

        function SaveTheCount(){


        fs.readFile('./src/commands/member/messagecount.txt', 'utf-8', function (err, data) {
            //Channel.send(`Máme teď ${data} zpráv!`)

            //console.log(`fsdafads ${data}`)
            var countnow = Number(data);
            var writecount = countnow+count;

            if (err)
                return console.error(err);
                fs.writeFile('./src/commands/member/messagecount.txt', writecount, { flag: 'w' }, function(err) {
                    if (err) 
                        return console.error(err);
                        Channel.setTopic(`<:stare:736560671247826965> Napsali jsme tu ${writecount} zpráv!`) 
                        count = 0;
           });
    });

    setTimeout(SaveTheCount, 600000);

}

SaveTheCount();    
    },
    foo: function (message) {
        count++;
        //console.log(count)
        // Channel.setTopic(`Napsali jsme tu ${count} zpráv!`)
    },
    ans: async function (message) {
        var facts = ["Myslím, že ano!", "Asi ne...", "Kdoví", "Myslím, že ne...", "To se nikdy nedozvíme...", "Zeptej se pak...", "Ano!", "Samozřejmě!", "Jasně že jo!!!", "Ne!!!", "Jak tě to vůbec napadlo? <:coooo:735501353316515860>", "Samozřejmě, že ne!!!", "Asi jo :D"];
        var fact = Math.floor(Math.random() * facts.length);

        message.channel.send('<:hmmm:735501352934965378>')
            .then((msg)=> {
            setTimeout(function(){
                msg.edit('<:okabe_sip:735501353387950150>');
                    setTimeout(function(){
                        msg.edit('<:joooo:735501352792227845>');
                            setTimeout(function(){
                                msg.edit(`${facts[fact]}`);
                            }, 1000)
                    }, 1000)
            }, 1000)
            }); 
    },
    aliases: []
    }