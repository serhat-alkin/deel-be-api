const httpStatus = require('http-status');

class HttpError extends Error {
  constructor(code = httpStatus.INTERNAL_SERVER_ERROR, message = httpStatus['500_MESSAGE']) {
    super(message);
    this.code = code;
  }
}

module.exports = {
  HttpError,
}
