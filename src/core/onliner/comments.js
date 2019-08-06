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
  return comments.map(comment => {
    const model = {
      authorId: comment.author.id,
      authorName: comment.author.name,
      content: comment.text,
      postedAt: new Date(comment.created_at),

      dislikes: comment.marks.dislikes,
      likes: comment.marks.likes,

      article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article',
        required: true,
        index: true,
      },
      parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
        index: true,
      },
    }
  }({
    authorId: comment.author.id,
    authorName: comment.author.name,
    content: comment.text,
    postedAt: new Date(comment.created_at),

    dislikes: comment.marks.dislikes,
    likes: comment.marks.likes,

    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'article',
      required: true,
      index: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment',
      index: true,
    },
  }));
}
