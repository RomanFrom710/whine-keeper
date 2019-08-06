import Sequelize from 'sequelize';

import sequelize from '../connection';

export default class BaseModel extends Sequelize.Model {
  static init(attributes, options = {}) {
    const newOptions = {
      sequelize,
      ...options,
    };

    return super.init(attributes, newOptions);
  }
}
