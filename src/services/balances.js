const { HttpError } = require('../httpError');
const { CUSTOM_ERRORS, CLIENT_MAX_DEPOSIT, CONTRACT_STATUS } = require('../config/constants');
const { retrieveProfile, retrieveSumOfNonPaidJobs, updateProfile } = require('../daos/dao');

const deposit = async (client, amount, transaction = null) => {
  const sum = await retrieveSumOfNonPaidJobs(client.id, CONTRACT_STATUS.IN_PROGRESS);
  const maxDeposit = sum * CLIENT_MAX_DEPOSIT;
  if (amount > maxDeposit) throw new HttpError(400, CUSTOM_ERRORS.DEPOSIT_AMOUNT_EXCEEDED);
  await updateProfile(
    client,
    {balance: Number((client.balance + amount).toFixed(2))},
    transaction
  )
  return client;
}

const getClientById = async(id, transaction = null) => {
  return await retrieveProfile(id, transaction);
}

module.exports = {
  deposit,
  getClientById,
};