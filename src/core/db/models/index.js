import Article from './article';
import Comment from './comment';
import Tag from './tag';
import Task from './task';

const articleTag = 'ArticleTag';
Article.belongsToMany(Tag, {through: articleTag});
Tag.belongsToMany(Article, {through: articleTag});

Comment.belongsTo(Article);
Article.hasMany(Comment);

Comment.belongsTo(Comment, {as: 'parent'});
Comment.hasMany(Comment, {as: 'children'});

export {
  Article,
  Comment,
  Task,
};
