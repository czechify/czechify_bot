
const discord = require('discord.js');
var translate = require('yandex-translate')("trnsl.1.1.20200331T171535Z.b4fd98881160a524.80d594e99f77be0979ac291af1b4543e1bba83c8");

module.exports = {
  run: async (client, message, args) => {

    if (!args){

    }else{

    let Member = await message.guild.members.cache.get(message.author.id);

        translate.translate(args, { to: 'en' }, function (err, res) {
            eng = res.text;
            translate.translate(args, { to: 'cs' }, function (err, res) {
                cz = res.text;
                translate.detect(args, function(err, res) {
                  lang = res.lang;
                  translate.translate("Translation to Czech and English", { to: `${lang}` }, function (err, res) {
                    header = res.text;
                    SendMessage(eng, cz, Member, header);

                  })
                });
               })

        })
    
      }



    function SendMessage(content, cz,  member, language){
      let embed = new discord.MessageEmbed()
      .setTitle(language)
      .setDescription(`\u200B\n:flag_gb: ${content}\n\u200B\n:flag_cz: ${cz}\n\u200B`)
      .setColor('#f2ffff')
      .setFooter(member.displayName, member.user.displayAvatarURL());
      message.channel.send(embed);

      }
    },
  aliases: ['translate', 'translator', 'prelozit', 'preloz', 'překlad']
}