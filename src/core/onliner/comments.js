import axios from 'axios';

export const getUrl = (articleId, articleCategory) => (
  `https://comments.api.onliner.by/news/post.${articleCategory}/${articleId}/comments`
);

export async function getComments(url) {
  const params = {
    limit: 99999,
    v: Math.random(),
  };

  const {data: {comments}} = await axios.get(url, {params});
  return comments;
}
