const discord = require('discord.js');

module.exports = {
    run: async (client, message, args) => {

const htmlToText = require('html-to-text');
const getHTML = require('html-get')


getHTML('https://nej-vtipy.cz/').then(
    ({ url, html, stats, headers, statusCode }) =>
      console.log(html))

},
aliases: ['']
}