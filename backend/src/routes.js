const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const routes = express.Router();

routes.get('/ong', OngController.index);
routes.post('/ong', OngController.create);

routes.post('/incident', IncidentController.create);
routes.get('/incident', IncidentController.index);
routes.delete('/incident/:id', IncidentController.delete);

module.exports = routes;
