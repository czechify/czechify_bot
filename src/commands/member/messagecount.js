const discord = require('discord.js');
const client = new discord.Client();
const fs = require('fs');
const message = require('./../../events/messages/message');
const { SourceMap } = require('module');

var count = 0;
var userMessageCount = []

  module.exports = {
 
    run: async(client, message, args)  => {
        let Channel = message.guild.channels.cache.find(role => role.name === "🤗︴baveníčko");
        message.channel.send(`Počítám...`)

        function SaveTheCount(){
            setTimeout(function () {
        fs.readFile('./src/commands/member/messagecount.txt', 'utf-8', function (err, data) {
            //Channel.send(`Máme teď ${data} zpráv!`)

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

    fs.readFile('./src/commands/member/stats.json', 'utf-8', function (err, data) {

        obj = JSON.parse(data);


        for(var k in userMessageCount) {
            obj[`${userMessageCount[k].id}`]['messagecount'] = obj[`${userMessageCount[k].id}`]['messagecount']+userMessageCount[k].count;
            obj[`${userMessageCount[k].id}`]['lastmessage'] = userMessageCount[k].lastmessage;
         }

        

        if (err)
            return console.error(err);
            json = JSON.stringify(obj, null, 4); //convert it back to json

            fs.writeFile('./src/commands/member/stats.json', json, { flag: 'w' }, function(err) {
                if (err) 
                    return console.error(err);
                    userMessageCount=[];
       });
});
SaveTheCount();
            }, 60000);

}

SaveTheCount();    
    },
    foo: function (message) {
        count++;
        var Time = new Date();
        var theTime = Time.getTime();

        if (!(userMessageCount.length)) {
            let newobj = {"id": message.author.id,
            "count": 1,
            "lastmessage":`${theTime}`};
            userMessageCount.push(newobj)
        } else {
            if (userMessageCount.find(e => e.id === message.author.id)) {
              var m = userMessageCount.find(e => e.id === message.author.id)
              m.count+= 1;
              m.lastmessage = `${theTime}`;
            } else {
                let newobj = {"id": message.author.id,
                "count": 1,
                "lastmessage":`${theTime}`}
                userMessageCount.push(newobj)
            }
          }

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
    do: async function (message) {

        var hugGIFS = ["https://i.imgur.com/BPLqSJC.gif", "https://i.imgur.com/ntqYLGl.gif", "https://i.imgur.com/r9aU2xv.gif", "https://i.imgur.com/wOmoeF8.gif", "https://i.imgur.com/nrdYNtL.gif", "https://i.imgur.com/v47M1S4.gif", "https://i.imgur.com/4oLIrwj.gif", "https://i.imgur.com/6qYOUQF.gif", "https://i.imgur.com/FCXa6Gx.gif", "https://i.imgur.com/34Ldmbz.gif", "https://i.imgur.com/RPYNm9o.gif", "https://i.imgur.com/BCCXWb2.gif", "https://i.imgur.com/YWodUk2.gif", "https://i.imgur.com/hgDeZLg.gif", "https://i.imgur.com/KYwFHgK.gif", "https://i.imgur.com/ReFdPgW.gif"];
        var patGIFS = ["https://i.imgur.com/2lacG7l.gif", "https://i.imgur.com/UWbKpx8.gif", "https://i.imgur.com/4ssddEQ.gif", "https://i.imgur.com/2k0MFIr.gif", "https://i.imgur.com/LUypjw3.gif", "https://i.imgur.com/F3cjr3n.gif", "https://i.imgur.com/4UUcmw4.gif", "https://i.imgur.com/cGzxsF3.gif", "https://i.imgur.com/bre4sRm.gif", "https://i.imgur.com/TM9rPGo.gif", "https://i.imgur.com/GeSscPL.gif", "https://i.imgur.com/lZst12K.gif", "https://i.imgur.com/3wFMOxX.gif"];
        var cuddleGIFS = ["https://media.tenor.com/images/2111a63b4ffd03ebe926317ad26d393b/tenor.gif", "https://media.tenor.com/images/2bb6bb01e688c05ddd02f871971b88ba/tenor.gif", "https://media.tenor.com/images/ec5f44a6f93adfa22e36a5c78ae44cdf/tenor.gif", "https://media.tenor.com/images/3fa3d515afaab7ebaddfe76927ef55b9/tenor.gif", "https://media.tenor.com/images/e90e0290b5e9025c790a3f6932477de3/tenor.gif", "https://media.tenor.com/images/1fe47ce1ea29dfcaba48488abafaa471/tenor.gif", "https://media.tenor.com/images/57559abb91934c8aaa325a71b0d01706/tenor.gif", "https://media.tenor.com/images/b62c99771c7ab751f80d2bb561c75068/tenor.gif", "https://media.tenor.com/images/3feec62822643e85f945a5c6311d05a6/tenor.gif", "https://media.tenor.com/images/063e40d4c9aedd908c94fc781807cd2a/tenor.gif"]
        var kissGIFS = ["https://media.tenor.com/images/26aaa1494b424854824019523c7ba631/tenor.gif", "https://media.tenor.com/images/8046e6cd73eab8471f5d92e96a0d90f0/tenor.gif", "https://media.tenor.com/images/924c9665eeb727e21a6e6a401e60183b/tenor.gif", "https://media.tenor.com/images/68d59bb29d7d8f7895ce385869989852/tenor.gif", "https://media.tenor.com/images/b020758888323338c874c549cbca5681/tenor.gif", "https://media.tenor.com/images/4e9c5f7f9a6008c1502e1c12eb5454f9/tenor.gif", "https://media.tenor.com/images/9fb52dbfd3b7695ae50dfd00f5d241f7/tenor.gif", "https://media.tenor.com/images/be2b3298bc9880b9ffcdc7a47635fff6/tenor.gif", "https://media.tenor.com/images/6702ca08b5375a74b6b9805382021f73/tenor.gif", "https://media.tenor.com/images/14513dad197291879cbab8b970b6fb7b/tenor.gif", "https://media.tenor.com/images/a639662ea62cf7c74e594d5f3d030b1a/tenor.gif", "https://media.tenor.com/images/9d04996fc79a9a3e1c21c08d8cc8c88b/tenor.gif", "https://media.tenor.com/images/c9fba5642c0d4984d8c44c8cc62826cd/tenor.gif", "https://media.tenor.com/images/1e62124baa07326a20127730fd61a464/tenor.gif", "https://media.tenor.com/images/9f621e46e1babde8d2e74886e7ff795a/tenor.gif"]
        var slapGIFS = ["https://media.tenor.com/images/53b846f3cc11c7c5fe358fc6d458901d/tenor.gif", "https://media.tenor.com/images/091e0502e5fda1201ee76f5f26eea195/tenor.gif", "https://media.tenor.com/images/47a6be1fbc1c40c3a55c0e2c8b725603/tenor.gif", "https://media.tenor.com/images/47698b115e4185036e95111f81baab45/tenor.gif", "https://media.tenor.com/images/c8832c9d5596ed9e6297c947047b584d/tenor.gif", "https://media.tenor.com/images/49b0ce2032f6134c31e1313cb078fe5a/tenor.gif", "https://media.tenor.com/images/5f2ff2ae7cea4fc3f1e701606dec84f8/tenor.gif", "https://media.tenor.com/images/d72112b23e13a678f1c0912721a552ae/tenor.gif", "https://media.tenor.com/images/d63b9fcb5b77728c29427d27f142b096/tenor.gif", "https://media.tenor.com/images/122b4c40cc6f10babd866fd3a0b62d3b/tenor.gif"] 

        if(message.content.toLowerCase().includes("obejmout") || message.content.toLowerCase().includes("objat") || message.content.toLowerCase().includes("hug") || message.content.toLowerCase().includes("objímat")){
            SendGIF("objímá", hugGIFS);
        }else if(message.content.toLowerCase().includes("hladit") || message.content.toLowerCase().includes("pohladit") || message.content.toLowerCase().includes("pat")){
            SendGIF("hvadí", patGIFS);
        }else if(message.content.toLowerCase().includes("mazlit") || message.content.toLowerCase().includes("pomazlit") || message.content.toLowerCase().includes("cuddle")){
            SendGIF("se mazví s", cuddleGIFS);
        }else if(message.content.toLowerCase().includes("políbit") || message.content.toLowerCase().includes("líbat") || message.content.toLowerCase().includes("pusa") || message.content.toLowerCase().includes("kiss") || message.content.toLowerCase().includes("pusu")){
            SendGIF("líbá", kissGIFS);
        }else if(message.content.toLowerCase().includes("udeřit") || message.content.toLowerCase().includes("bít") || message.content.toLowerCase().includes("slap") || message.content.toLowerCase().includes("punch")|| message.content.toLowerCase().includes("úder")){
        SendGIF("bouchá", slapGIFS);
        }

        function SendGIF(description, gifArray){
        
            if(message.mentions.users.first()){
            let memberId = message.mentions.users.first();
            let otherMember = message.guild.members.cache.get(memberId.id);
            let thisMember = message.guild.members.cache.get(message.author.id);
            var theGIF = Math.floor(Math.random() * gifArray.length);
            let embed = new discord.MessageEmbed();
            embed
            .setColor('#fafafa')
            .setDescription(`**${thisMember.displayName}** ${description} **${otherMember.displayName}**`)
            .setImage(`${gifArray[theGIF]}`);
            message.channel.send(embed);
        }
    }
    
    },
    aliases: []
    }