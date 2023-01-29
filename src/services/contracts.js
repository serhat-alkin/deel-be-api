const { CONTRACT_STATUS } = require('../config/constants');
const { retrieveContractById, retrieveContractsOfUserByStatus } = require('../daos/dao');

const getContractById = async(id, userId) => {
  return await retrieveContractById(id, userId);
}

const getContractsOfUserByStatus = async(userId) => {
  return await retrieveContractsOfUserByStatus(userId, CONTRACT_STATUS.TERMINATED);
}

module.exports = {
  getContractById,
  getContractsOfUserByStatus,
};