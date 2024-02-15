const express = require('express');
const SessionController = require('./controllers/SessionController')
const Router = express.Router;


const routes = new Router();

routes.post('/session', SessionController.create);

module.exports = routes;