const httpStatus = require('http-status');
const { HttpError } = require('../httpError');
const { sequelize } = require('../model');
const BalanceService = require('../services/balances');
const { CUSTOM_ERRORS, CLIENT_TYPES } = require('../config/constants');

const deposit = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      const client = await BalanceService.getClientById(
        req.params.userId, 
        transaction,
      );
      if (!client || client.type !== CLIENT_TYPES.CLIENT) throw new HttpError(httpStatus.NOT_FOUND, CUSTOM_ERRORS.CLIENT_NOT_FOUND);
      const result = await BalanceService.deposit(
        client,
        req.body.amount,
        transaction,
      );
      if (result?.length === 0) throw new HttpError(httpStatus.NOT_FOUND, httpStatus['404_MESSAGE']);
      return res.json(result);
    })
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deposit,
};