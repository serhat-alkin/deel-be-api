const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model')
const { getProfile } = require('./middleware/getProfile')
const { errorHandler } = require('./middleware/errorHandler');
const { getContractById, getNotTerminatedContractsOfUser } = require('./controllers/contracts');
const { getNonPaidJobs, payForJob } = require('./controllers/jobs');
const { deposit } = require('./controllers/balances');
const { getBestProfession, getBestClients } = require('./controllers/admin');

const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.get('/contracts/:id', getProfile, getContractById);
app.get('/contracts', getProfile, getNotTerminatedContractsOfUser);
app.get('/jobs/unpaid', getProfile, getNonPaidJobs);
app.post('/jobs/:id/pay', getProfile, payForJob);
app.post('/balances/deposit/:userId', deposit);
app.get('/admin/best-profession', getBestProfession);
app.get('/admin/best-clients', getBestClients);

app.use(errorHandler);
module.exports = app;
