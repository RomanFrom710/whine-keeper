import Sequelize from 'sequelize';

import BaseModel from './base';

export default class Comment extends BaseModel {}
author: {type: Sequelize.STRING, allowNull: false},
category: {type: Sequelize.ENUM(Object.values(ONLINER_CATEGORY)), allowNull: false},
onlinerId: {type: Sequelize.INTEGER, allowNull: false},
postedAt: {type: Sequelize.DATE, allowNull: false},
title: {type: Sequelize.STRING, allowNull: false},
url: {type: Sequelize.STRING, allowNull: false},
views: {type: Sequelize.INTEGER, allowNull: false},
Comment.init({
  authorId: {type: Sequelize.INTEGER, allowNull: false},
  authorName: {type: Sequelize.STRING, allowNull: false},
  content: {type: Sequelize.STRING, allowNull: false},
  postedAt: {type: Sequelize.DATE, allowNull: false},

  dislikes: {type: Sequelize.INTEGER, allowNull: false},
  likes: {type: Sequelize.INTEGER, allowNull: false},

  isRemoved: {type: Sequelize.BOOLEAN},

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
})

const snapshotSchema = new mongoose.Schema({
  content: {type: String},
  dislikes: {type: Number},
  likes: {type: Number},
});

const commentSchema = new mongoose.Schema({

});

commentSchema.plugin(timestamps);
snapshotSchema.plugin(timestamps);
