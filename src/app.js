const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model')
const {getProfile} = require('./middleware/getProfile')
const { getContractById, getNotTerminatedContractsOfUser } = require('./controllers/contracts');
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.get('/contracts/:id', getProfile, getContractById);
app.get('/contracts', getProfile, getNotTerminatedContractsOfUser);


module.exports = app;
