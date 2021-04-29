import { Sequelize } from 'sequelize';
import config from '../../config/env';
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  port: config.port,
  dialect: 'postgres',
});
export default sequelize;