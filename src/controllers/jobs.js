const httpStatus = require('http-status');
const JobService = require('../services/jobs');
const { HttpError } = require('../httpError');
const { sequelize } = require('../model');

const getNonPaidJobs = async (req, res, next) => {
  try {
    const result = await JobService.getNonPaidJobs(
      req.profile.id, 
    );
    if (result?.length === 0) throw new HttpError(httpStatus.NOT_FOUND, httpStatus['404_MESSAGE']);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const payForJob = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const result = await JobService.payForJob(
        req.profile.id,
        req.params.id, 
        transaction,
      );
      if(!result) throw new HttpError(httpStatus.NOT_FOUND, httpStatus['404_MESSAGE']);
      return res.json(result);
    })
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNonPaidJobs,
  payForJob,
};