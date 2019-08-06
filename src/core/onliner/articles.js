import axios from 'axios';
import cheerio from 'cheerio';
import {stringify as makeQuery} from 'querystring';

import {ONLINER_CATEGORY} from '../enums';

const startDate = new Date('2018-04-05T04:00:00.000Z'); // The new comments system began.

export function getUrl(category, fromDate) {
  const baseUrl = category === ONLINER_CATEGORY.opinions
    ? `https://${ONLINER_CATEGORY.people}.onliner.by/${category}` // Special category.
    : `https://${category}.onliner.by`;

  if (!fromDate) {
    return baseUrl;
  }

  const query = makeQuery({fromDate: fromDate.getTime()});

  return `${baseUrl}?${query}`;
}

export async function getArticles(url) {
  const {data} = await axios.get(url);
  const $ = cheerio.load(data);

  const linkElements = $.find('.news-tidings').find('.news-tidings__stub,.news-tiles__stub');
  const links = linkElements.map((__index, element) => $(element).attr('href'));

  if (!$('.news-more_visible').length) {
    return null;
  }

  const newFromDate = linkElements.closest('[data-post-date]').data('post-date');

  return {links, newFromDate};
}

export async function processArticle(url) {
  const {data} = await axios.get(url);
  const $ = cheerio.load(data);

  const author = $('meta[name="author"]').attr('content');
  const category = url.match(/\/\/(\w+)\./)[1];
  const onlinerId = $('app').attr('entity-id');
  const title = $('title').text();
}
