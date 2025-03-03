const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Make sure you have a db.json file
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ JSON Server is running on port ${PORT}`);
});