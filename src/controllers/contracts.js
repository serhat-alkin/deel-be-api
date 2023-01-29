const ContractService = require('../services/contracts');
const httpStatus = require('http-status');
const { HttpError } = require('../httpError');

// Use the profile information that has been set in getProfile middleware 
const getContractById = async (req, res) => {
  try {
    const result = await ContractService.getContractById(
      req.params.id,
      req.profile.id,
    );
    if (!result) throw new HttpError(httpStatus.NOT_FOUND, httpStatus['404_MESSAGE']);
    return res.json(result);
  } catch (error) {
    if (err instanceof HttpError) {
			return res.status(err.code).json({ message: err.message });
		}
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: httpStatus['500_MESSAGE'] });
  }
};

const getNotTerminatedContractsOfUser = async (req, res) => {
  try {
    const result = await ContractService.getContractsOfUserByStatus(
      req.profile.id,
    );
    if (result?.length === 0) throw new HttpError(httpStatus.NOT_FOUND, httpStatus['404_MESSAGE']);
    return res.json(result);
  } catch (error) {
    if (err instanceof HttpError) {
			return res.status(err.code).json({ message: err.message });
		}
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: httpStatus['500_MESSAGE'] });
  }
};

module.exports = {
  getContractById,
  getNotTerminatedContractsOfUser,
};