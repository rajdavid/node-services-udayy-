import { Sequelize } from 'sequelize';
import config from '../../config/env';
const sequelize = new Sequelize('bot_store', config.mySqlUserName, config.mySqlPassword, {
  host: config.mySqlPvt,
  port: config.mySqlPort,
  dialect: 'mysql',
});
export default sequelize;