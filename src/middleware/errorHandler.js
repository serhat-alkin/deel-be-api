const httpStatus = require('http-status');
const { HttpError } = require('../httpError');

const errorHandler = (err, req, res, next) => {
  console.error('error : ', err);
  if (err instanceof HttpError) {
    return res.status(err.code).json({ message: err.message });
  }
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: httpStatus['500_MESSAGE'] });
};
module.exports = { errorHandler }