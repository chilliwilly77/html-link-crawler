# HTML link crawler

Implements the [simplecrawler](https://github.com/simplecrawler) module to return a bugger for each html link found on a domain.

## Usage

Get all html for a localhost:3000, and strip 'fromSearch' query param in order to remove duplicates.

```ecmascript 6

const htmlLinkCrawler = require('html-link-crawler');
htmlLinkCrawler({url: 'http://localhost:3000/', ignoreQsParams: ['fromSearch']})
  .on('htmlFetchComplete', html => {
    console.info(Object.keys(html))
  })
  .start();

```

## Events

The object returned is exactly as the [simplecrawler](https://github.com/simplecrawler) module, with one
additional event:

* `htmlFetchComplete` - fired on complete. Returns an object with path to resource as the key and the html as the value.
