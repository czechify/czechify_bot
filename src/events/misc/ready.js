const {createStream} = require('table');
const tableConfig = require('../../utils/tableConfig');
var common = require('./../../commands/member/messagecount');



module.exports = (client) => {
    console.log(`Funguje to`);
    client.user.setActivity("na nejlepším serveru");
    common.aha;
    //client.guild.channels.get('747938840680988682').fetchMessage('748273427307036782');

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
};