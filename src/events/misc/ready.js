discord = require('discord.js')
global.temp = 1;
global.hiddenCategories = {"mod": true}
global.hiddenCommands = {'bumpreminder': true, "thanks": true, 'add': true, 'check-servers': true}
module.exports = async (client) => {
    setInterval(function() {
        if (global.temp == 1) {
            client.user.setActivity("/pomoc", { type: 'LISTENING' });
            global.temp = 2;
        }else if (global.temp == 2){
            var members = 0;
            client.guilds.cache.forEach((guild) => { members = members + guild.memberCount; })
            //if (!(client.guilds.cache.size == 1)) p = 's'; else p = '';
            if (!(members == 1)) p = 's'; else p = '';
            client.user.setActivity(' ' + members + ' member' + p, { type: 'WATCHING' })
            //client.user.setActivity('in ' + client.guilds.cache.size + " server" + p)
            global.temp = 3;
        }else if (global.temp == 3) {
            var cmds = [];
            Object.keys(client.commands).forEach((cmd) => {
                cmd = client.commands[cmd];
                if ((cmd[2])&&(cmd[5])) if (!((global.hiddenCategories[cmd[2]])||(global.hiddenCommands[cmd[5]]))) if (!(cmds.includes(cmd[5]))) cmds.push(cmd[5]);
            })
            client.user.setActivity("/" + cmds[Math.floor(Math.random() * cmds.length)], { type: 'LISTENING' })
            global.temp = 1
        }
    }, 5000)
    console.log(`${client.user.tag} funguje`);

    setInterval(function() {
        client.guilds.cache.forEach(async (guild) => {
            var channel = await global.findAChannel(0, guild, "vitejte");
            if (channel) {
                var role = await global.findARole(guild, 0, "Learning Czech");
                channel.send('<@&' + role.id + '>').then((msg) => { msg.delete().catch((e) => {}) });
                var embed = new discord.MessageEmbed()
                    .setDescription('Please write **/level**!')
                    .setColor('#d7141a')
                    .setAuthor("Welcome! Set your level to enter the server!");
                channel.send(embed)
            }
        })
    }, 21600000)

    client.guilds.cache.forEach(async (guild) => {
        var roles = global.sortByKey(await global.findRoles(guild, 0, ["Beginner", "Intermediate", "Advanced", "Fluent", "Native Speaker", "Learning Czech"]), "name");
        var members = await guild.members.fetch();
        members.forEach((member) => {
            var hasARole = false;
            roles.forEach(async (role) => {
                if ((member.roles.cache.has(role.id))||(member.user.bot)) hasARole = true;
            })
            if ((!(hasARole))&&(roles[0])&&(roles[1])&&(roles[2])&&(roles[3])&&(roles[4])&&(roles[5])) {
                let welcomeMsg = new discord.MessageEmbed()
                    .setColor('#ffa530')
                    .setTitle(`Vítej, ${member.displayName}!`)
                    .setDescription(`:flag_cz: __**Vítám tě na ČEŠTINĚ**, hlavním serveru Česka__!

                    •  Pro začátek si nastav úroveň češtiny a svou rodnou zemi napsáním **/úroveň** do <#434227488726712320>!
                    •  Neboj se kdykoli napsat do <#433946325969797133>, zeptat v <#434230418334547968> nebo se připojit do hlasového kanálu!
                    •  V # bot se můžeš učit nová slovíčka s pomocí **slovo**!
                    •  Jestli budeš potřebovat pomoc napiš adminům!


                    :flag_gb: __**Welcome to CZECH**, the main Czech server__!

                    •  Firstly, set your Czech level and your country by writing **/level** in <#434227488726712320>!
                    •  Don't be afraid to write to <#433946325969797133> at any time, ask in <#434230418334547968> or join the voice channel!
                    •  In # bot you can learn new vocabulary with **word**!
                    •  If you need help message the admins!`
                    );
                member.send(welcomeMsg);
                member.roles.add(roles[4])
            }
        })
    })
};
