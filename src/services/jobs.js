const { CUSTOM_ERRORS } = require('../config/constants');
const httpStatus = require('http-status');
const { HttpError } = require('../httpError');
const { retrieveJobsByStatusAndUser, retrieveJob, retrieveProfile, updateProfile, updateJob }  = require('../daos/dao');
const { CONTRACT_STATUS } = require('../config/constants');

const getNonPaidJobs = async(userId) => {
  return await retrieveJobsByStatusAndUser(userId, CONTRACT_STATUS.IN_PROGRESS);
}

const payForJob = async(clientId, jobId, transaction = null) => {
  const job = await retrieveJob(clientId, jobId, transaction);
  if (!job) throw new HttpError(httpStatus.NOT_FOUND, CUSTOM_ERRORS.JOB_NOT_FOUND);
  if (job.paid) throw new HttpError(httpStatus.BAD_REQUEST, CUSTOM_ERRORS.JOB_PAID);

  const contractor = await retrieveProfile(job.Contract.ContractorId, transaction);
  const client = await retrieveProfile(clientId, transaction);
  if (!client && !contractor) throw new HttpError(httpStatus.NOT_FOUND, CUSTOM_ERRORS.CLIENT_NOT_FOUND);
  if (job.price > client.balance) throw new HttpError(httpStatus.BAD_REQUEST, CUSTOM_ERRORS.INSUFFICIENT_FUNDS);

  await updateProfile(
    contractor,
    {balance: contractor.balance + job.price},
    transaction,
  );
  await updateProfile(
    client,
    {balance: client.balance - job.price},
    transaction,
  );
  await updateJob(
    job,
    {paid:true, paymentDate: new Date().toISOString()},
    transaction,
  );
  return {
    job,
    client_balance: client.balance,
    contractor_balance: contractor.balance
  };
}

module.exports = {
  getNonPaidJobs,
  payForJob,
};