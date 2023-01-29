const httpStatus = require('http-status');
const AdminService = require('../services/admin');
const { HttpError } = require('../httpError');

const getBestProfession = async (req, res, next) => {
  try {
    const result = await AdminService.getBestProfession(
      req.query.startDate, 
      req.query.endDate,
    );
    if (!result) throw new HttpError(httpStatus.NOT_FOUND, httpStatus['404_MESSAGE']);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const getBestClients = async (req, res, next) => {
  try {
    const result = await AdminService.getBestClients(
      req.query.startDate, 
      req.query.endDate, 
      req.query.limit,
    );
    console.log('result*****', result)
    if (result?.length === 0) throw new HttpError(httpStatus.NOT_FOUND, httpStatus['404_MESSAGE']);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBestClients,
  getBestProfession,
};