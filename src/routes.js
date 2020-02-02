const { Router } = require('express');
const DevController = require('./controllers/DevController');

routes = Router();

// cadastro de devs
routes.post('/devs', DevController.store);

module.exports = routes;