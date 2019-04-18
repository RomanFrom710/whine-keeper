import axios from 'axios';
import cheerio from 'cheerio';

import {ONLINER_CATEGORY} from '../enums';

const getUrl = category => category === ONLINER_CATEGORY.opinions
  ? `https://${ONLINER_CATEGORY.people}.onliner.by/${category}` // Special category.
  : `https://${category}.onliner.by`;

export const urls = Object.values(ONLINER_CATEGORY).map(getUrl);

export default async function getArticles(url, fromDate) {
  const params = {
    fromDate,
  };

  const {data} = await axios.get(url, {params});
  const $ = cheerio.load(data);
}
