const { Op } = require('sequelize');
const { Job, Contract, Profile } = require('../model');
const { sequelize } = require('../model');

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

const retrieveJobsByStatusAndUser = async(userId, status) => {
  return Job.findAll({
    where: {
      paid: false,
    },
    include: [
      {
        model: Contract,
        attributes: [],
        required: true,
        where: {
          status,
          [Op.or]: [
            { ContractorId: userId },
            { ClientId: userId },
          ],
        },
      },
    ],
  });
}

const retrieveProfile = async (profileId, transaction = null) => {
  return await Profile.findByPk(profileId, { transaction });
}

const retrieveJob = async(clientId, jobId, transaction = null ) => {
  return await Job.findOne(
    {
      where: {
        id: jobId,
      },
      include: [
        {
          model: Contract,
          attributes: ['id', 'ClientId', 'ContractorId'],
          required: true,
          where: {
            ClientId: clientId,
          },
        },
      ],
    },
    { transaction }
  );
}

const updateJob = async (job, data, transaction = null) => {
  Object.keys(data).forEach((key) => {
    job[key] = data[key];
  });
  await job.save({ fields: Object.keys(data), transaction });
};

const updateProfile = async (profile, data, transaction = null) => {
  Object.keys(data).forEach((key) => {
    profile[key] = data[key];
  });
  await profile.save({ fields: Object.keys(data), transaction });
};

const retrieveSumOfNonPaidJobs = async(clientId, status) => {
  return Job.sum('price', {
    where: {
      paid: false,
    },
    include: [
      {
        model: Contract,
        attributes: [],
				required: true,
        where: {
          status,
          ClientId: clientId,
        },
      },
    ],
  });
}

const retrieveBestProfession = async(startDate, endDate) => {
  const profiles = await Profile.findAll({
    attributes: ['profession', [sequelize.fn('SUM', sequelize.col('price')), 'sumEarnings']],
    include: [
      {
        model: Contract,
        as: 'Contractor',
        attributes: [],
        required: true,
        include: [
          {
            model: Job,
            required: true,
            attributes: [],
            where: {
              paymentDate: {
                [Op.gte]: startDate,
                [Op.lte]: endDate,
              },
              paid: true,
            },
          },
        ],
      },
    ],
    where: {
      type: 'contractor',
    },
    group: ['profession'],
    order: [[sequelize.col('sumEarnings'), 'DESC']],
    subQuery: false,
    limit: 1,
  });

  if (!profiles.length) {
    return null;
  }

  return profiles[0].get({ plain: true });
}


const retrieveBestClients = async(startDate, endDate, limit) => {
  const results = await Job.findAll({
    attributes: [[sequelize.fn('sum', sequelize.col('price')), 'paid']],
    order: [[sequelize.fn('sum', sequelize.col('price')), 'DESC']],
    group: ['Contract.Client.id'],
    where: {
      paid: true,
      paymentDate: {
        [Op.gte]: startDate,
        [Op.lte]: endDate,
      },
    },
    limit,
    include: [
      {
        model: Contract,
        attributes: ['id'],
        include: [
          {
            model: Profile,
            as: 'Client',
            where: { type: 'client' },
            attributes: ['id', 'firstName', 'lastName'],
          },
        ],
      },
    ],
  });

  return results.map((job) => ({
    id: job.Contract.Client.id,
    fullName: `${job.Contract.Client.firstName} ${job.Contract.Client.lastName}`,
    paid: job.paid,
  }));
}

module.exports = {
  retrieveContractById,
  retrieveContractsOfUserByStatus,
	retrieveJobsByStatusAndUser,
	retrieveProfile,
	retrieveJob,
	updateProfile,
	updateJob,
	retrieveSumOfNonPaidJobs,
	retrieveBestProfession,
	retrieveBestClients,
};