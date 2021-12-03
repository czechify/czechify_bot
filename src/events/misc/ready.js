/*
const {createStream} = require('table');
const database = require('../../database/database');
const tableConfig = require('../../utils/tableConfig');

module.exports = (client) => {
    console.log(`${client.user.tag} funguje`);
    client.user.setActivity("/pomoc"); 
    // let stream = createStream(tableConfig);
    // i = 0;
    // let fn = setInterval(() => {
    //     if(i === commandStatus.length)
    //     clearInterval(fn);
    //     else{
    //         stream.write(commandStatus[i]);
    //         i++;
    //     }
    // }, 50);
    database.then(() => console.log("Připojeno k databázi")).catch(err => console.log(err));
};
*/