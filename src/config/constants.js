const CONTRACT_STATUS = {
  NEW: 'new',
  IN_PROGRESS: 'in_progress',
  TERMINATED: 'terminated',
};

const CUSTOM_ERRORS = {
  CLIENT_NOT_FOUND: 'Client not found',
  JOB_NOT_FOUND: 'Job not found',
  JOB_PAID: 'Job is paid',
  INSUFFICIENT_FUNDS: 'Client have insufficient funds',
  DEPOSIT_AMOUNT_EXCEEDED: 'Deposit amount is exceeded. It cannot be more than 25% of total jobs to pay',
}

CLIENT_TYPES = {
  CLIENT: 'client',
  CONTRACTOR: 'contractor',
}

CLIENT_MAX_DEPOSIT = 0.25

module.exports = {
  CONTRACT_STATUS,
  CUSTOM_ERRORS,
  CLIENT_TYPES,
  CLIENT_MAX_DEPOSIT,
};