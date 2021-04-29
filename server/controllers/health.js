import responseObjectClass from '../objects/responseObjectClass';

const newResponseObject = new responseObjectClass();

async function checkConnection(req, res) {
  const returnObj = newResponseObject.generateResponseObject({
    code: 200,
    success: true,
    message: 'Utility Service, health is in working state :)',
  });
  res.send(returnObj);
}

export default {
  checkConnection,
};
