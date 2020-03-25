const express = require('express');
const OngController = require('./controllers/OngController');
const routes = express.Router();

routes.get('/ong', OngController.index);
routes.post('/ong', OngController.create);

module.exports = routes;
