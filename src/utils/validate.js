module.exports.checkCommandModule = (cmdName, cmdModule) =>
{
    if(!cmdModule.hasOwnProperty('run'))
        throw new Error(`${cmdName} nemá 'run'`);
    if(!cmdModule.hasOwnProperty('aliases'))
        throw new Error(`${cmdName} nemá 'řádek'`);
    return true;
}

module.exports.checkProperties = (cmdName, cmdModule) => {
    if(typeof cmdModule.run !== 'function')
        throw new Error(`${cmdName}.run není funkce`);
    if(!Array.isArray(cmdModule.aliases))
        throw new Error(`${cmdName}.aliases není řada`);
    return true;
}