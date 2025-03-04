const jsonServer = require('json-server');
const serverless = require('serverless-http');

// Create a JSON server instance
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Path to your JSON file
const middlewares = jsonServer.defaults();

// Set up middlewares
server.use(middlewares);
server.use(router);

// Export the handler for Netlify's serverless function
module.exports.handler = serverless(server);
