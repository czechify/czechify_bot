const discord = require('discord.js');
const client = new discord.Client();
const fs = require('fs');
const message = require('./../../events/messages/message');
const { SourceMap } = require('module');


  module.exports = {
    run: async(client, message, args)  => {
 fs.readFile('./src/commands/member/messagecount.txt', 'utf-8', function (err, data) {
   
    if (err)
        return console.error(err);
        fs.writeFile('./src/commands/member/messagecount.txt', args, { flag: 'w' }, function(err) {
            if (err) 
                return console.error(err);
                
   });
});

},
aliases: []
}