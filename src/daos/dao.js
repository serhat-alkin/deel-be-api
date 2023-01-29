const { Op } = require('sequelize');
const { Contract } = require('../model');

const retrieveContractById = async(id, userId) => {
  return Contract.findOne({
    where: {
      id,
      [Op.or]: [
        { ContractorId: userId },
        { ClientId: userId },
      ],
    },
  });
}

const retrieveContractsOfUserByStatus = async(userId, status) => {
  return Contract.findAll({
    where: {
      [Op.or]: [
        { ClientId: userId },
        { ContractorId: userId },
      ],
      status: { [Op.ne]: status },
    },
  });
}

module.exports = {
  retrieveContractById,
  retrieveContractsOfUserByStatus,
};