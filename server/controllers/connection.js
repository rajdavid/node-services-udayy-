
import  PostGresConnection from '../helpers/sequalize'


async function getConnection(req, res) {
  console.log('Post Gress Conncetion ');
 
  try {
    await PostGresConnection.authenticate();
    console.log('Connection has been established successfully.');
    res.send({'connection':'successful'})
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    res.send({'connection':'failed'})
  }
}
export default {
  getConnection,
};