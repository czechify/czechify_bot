require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client({ partials: ['MESSAGE', 'REACTION']});
const fs = require('fs').promises;
const path = require('path');
const { checkCommandModule, checkProperties } = require('./utils/validate')
const c = require('ansi-colors');
const commandStatus = [
    [`${c.bold('Command')}`, `${c.bold('Status')}`]
];

const cachedMessageReactions = new Map();

client.login(process.env.BOT_TOKEN);
client.commands = new Map();

        (async function registerCommands(dir = 'commands')
        {
            let files = await fs.readdir(path.join(__dirname, dir));

            for(let file of files) {
                let stat = await fs.lstat(path.join(__dirname, dir, file));
                if(stat.isDirectory())
                    registerCommands(path.join(dir, file));
                else{
                    if (file.endsWith(".js")){
                        let cmdName = file.substring(0, file.indexOf(".js"));
                        try{
                            let cmdModule = require(path.join(__dirname, dir, file));
                            if(checkCommandModule(cmdName, cmdModule)) {
                                if(checkProperties(cmdName, cmdModule)) {
                                    let { aliases } = cmdModule;
                                    client.commands.set(cmdName, cmdModule.run);
                                    if(aliases.lenght !== 0) {
                                        aliases.forEach(alias => client.commands.set(alias, cmdModule.run));
                                    commandStatus.push(
                                        [`${c.cyan(`${cmdName}`)}`, `${c.black.bgGreenBright('Success')}`]
                                    )
                                    }
                            }        
                        }
                        }
                        catch(err){
                            console.log(err);
                            commandStatus.push(
                                [`${c.white(`${cmdName}`)}`, `${c.bgRedBright('Success')}`]
                            )
                        }
                    }
                }
            }
        })();

        (async function registerEvents(dir = 'events')
        {
            let files = await fs.readdir(path.join(__dirname, dir));

            for(let file of files) {
                let stat = await fs.lstat(path.join(__dirname, dir, file));
                if(stat.isDirectory())
                    registerEvents(path.join(dir, file));
                else{
                    if (file.endsWith(".js")){
                        let eventName = file.substring(0, file.indexOf(".js"));
                        try{
                            let eventModule = require(path.join(__dirname, dir, file));
                            client.on(eventName, eventModule.bind(null, client));
                        //     if(checkCommandModule(eventName, cmdModule)) {
                        //         if(checkProperties(eventName, cmdModule)) {
                        //             let { aliases } = cmdModule;
                        //             client.commands.set(cmdName, cmdModule.run);
                        //             if(aliases.lenght !== 0) {
                        //                 aliases.forEach(alias => client.commands.set(alias, cmdModule.run));
                        //             commandStatus.push(
                        //                 [`${c.cyan(`${cmdName}`)}`, `${c.black.bgGreenBright('Success')}`]
                        //             )
                        //             }
                        //     }        
                        // }
                        }
                        catch(err){
                            console.log(err);
                            commandStatus.push(
                                [`${c.white(`${eventName}`)}`, `${c.bgRedBright('Success')}`]
                            )
                        }
                    }
                }
            }
        })();