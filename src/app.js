const express = require('express');
const cors = require('cors');
const routes = require('./routes.js')
require('./database/index.js')

class App {
    constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    // EXPRESS.JSON() middleware to allow external access
    this.server.use(express.json());
    // CORS middleware to allow external access
    this.server.use(cors());
  }
  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;