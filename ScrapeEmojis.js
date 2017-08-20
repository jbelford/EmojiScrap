"use strict"

const request = require('request');
const cheerio = require('cheerio');

function scrapeNames() {
  return new Promise( (resolve, reject) => {
    request('https://www.emoji.codes/family', (err, resp, body) => {
      if (resp.statusCode == 200) {
        const $ = cheerio.load(body);
        const emojis = $('#emoji-list').find('tr')
          .children('td[class="name"]')
          .children('.shortcode')
          .map( (idx, elem) => $(elem).text())
          .toArray();
        return resolve(emojis);
      } 
      return reject(err);
    });
  });
}

function scrapeUnicode() {
  return new Promise( (resolve, reject) => {
    request('http://getemoji.com/', (err, resp, body) => {
      if (resp.statusCode == 200) {
        const $ = cheerio.load(body);
        const emojis = $('p[style="font-family: Segoe UI Emoji; font-size: 3.5em"]')
          .text().trim().split('\n');
        return resolve(emojis);
      }
      return reject(err);
    });
  });
}

module.exports = {
  scrapeNames: scrapeNames,
  scrapeUnicode: scrapeUnicode
};
