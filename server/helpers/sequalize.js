import { Sequelize } from 'sequelize';
import config from '../../config/env';
console.log("config", config);
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  port: config.mySQlPort,
  dialect:'mysql',
});
export default sequelize;