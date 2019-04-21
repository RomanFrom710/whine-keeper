import axios from 'axios';
import cheerio from 'cheerio';

import {ONLINER_CATEGORY} from '../enums';

const getUrl = category => category === ONLINER_CATEGORY.opinions
  ? `https://${ONLINER_CATEGORY.people}.onliner.by/${category}` // Special category.
  : `https://${category}.onliner.by`;

export const urls = Object.values(ONLINER_CATEGORY).map(getUrl);

export async function* getArticles(url) {
  let fromDate;

  while (true) {
    const params = {
      fromDate,
    };

    const {data} = await axios.get(url, {params});
    const $ = cheerio.load(data);

    const linkElements = $.find('.news-tidings').find('.news-tidings__stub,.news-tiles__stub');
    const links = linkElements.map((__index, element) => $(element).attr('href'));

    if (!$('.news-more_visible').length) {
      return;
    }

    fromDate = linkElements.closest('[data-post-date]').data('post-date');
    yield links;
  }
}
// TODO: find onliner new comments release date and test first articles with them.

export async function processArticle(url) {
  const {data} = await axios.get(url);
  const $ = cheerio.load(data);

  const author = $('meta[name="author"]').attr('content');
  const category = url.match(/\/\/(\w+)\./)[1];
  const onlinerId = $('app').attr('entity-id');
  const title = $('title').text();
}
