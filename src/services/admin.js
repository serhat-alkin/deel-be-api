
const { DEFAULT_QUERY_LIMIT_ADMIN_API } = require('../config/constants');
const { retrieveBestProfession, retrieveBestClients } = require('../daos/dao');

const getBestProfession = async(startDate, endDate) => {
  return await retrieveBestProfession(startDate, endDate);
}

const getBestClients = async(startDate, endDate, limit = DEFAULT_QUERY_LIMIT_ADMIN_API) => {
  return await retrieveBestClients(startDate, endDate, limit);
}

module.exports = {
  getBestProfession,
  getBestClients,
};