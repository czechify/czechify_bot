const {createStream} = require('table');
const database = require('../../database/database');
const tableConfig = require('../../utils/tableConfig');
var common = require('./../../commands/member/messagecount');



module.exports = (client) => {
    console.log(`Jo funguje`);
    client.user.setActivity("na nejlepším serveru");
    common.aha;

    /*let stream = createStream(tableConfig);
    i = 0;
    let fn = setInterval(() => {
        if(i === commandStatus.length)
        clearInterval(fn);
        else{
            stream.write(commandStatus[i]);
            i++;
        }
}, 50);
*/
database.then(() => console.log("Připojeno k databázi")).catch(err => console.log(err));
};