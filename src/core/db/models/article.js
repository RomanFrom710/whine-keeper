import Sequelize from 'sequelize';

import BaseModel from './base';
import {ONLINER_CATEGORY} from '../../enums';

export default class Article extends BaseModel {}

Article.init({
  author: {type: Sequelize.STRING, allowNull: false},
  category: {type: Sequelize.ENUM(Object.values(ONLINER_CATEGORY)), allowNull: false},
  onlinerId: {type: Sequelize.INTEGER, allowNull: false},
  postedAt: {type: Sequelize.DATE, allowNull: false},
  title: {type: Sequelize.STRING, allowNull: false},
  url: {type: Sequelize.STRING, allowNull: false},
  views: {type: Sequelize.INTEGER, allowNull: false},
});
const snapshotSchema = new Sequelize.Model({
  title: {type: String},
  views: {type: Number, required: true},
});
