const Crawler = require('simplecrawler');
const cheerio = require('cheerio');
const URL = require('url');

const stripQsParams = (url, params=[]) => {
  url = URL.parse(url, true);
  params.forEach(param => delete url.query[param]);
  delete url.path;
  delete url.search;
  return URL.format(url);
};

module.exports = ({url, ignoreQsParams=[]}) => {
  const crawler = new Crawler(url);
  // only discover resources that are an href and
  crawler.discoverResources = function(buffer) {
    const $ = cheerio.load(buffer.toString('utf8'));
    return $('a[href]').map(function () {
      return $(this).attr("href");
    }).get().map(resource => stripQsParams(resource, ignoreQsParams));
  };

  let html = {};
  return crawler
    .on('fetchcomplete', (queueItem, responseBuffer) => {
      html[queueItem.path] = responseBuffer.toString();
    })
    .on('complete', () => crawler.emit('htmlFetchComplete', html))
};
