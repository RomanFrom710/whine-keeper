import Sequelize from 'sequelize';

import BaseModel from './base';

export default class Tag extends BaseModel {}

Tag.init({
  name: {type: Sequelize.STRING, allowNull: false},
  urlName: {type: Sequelize.STRING, allowNull: false},
});
