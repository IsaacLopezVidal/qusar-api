const express = require("express");
const app = express();
const { logger } = require("./config/logger");
const  routes  = require("./routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger);
routes.forEach(({ path, route, middleware }) => {
  if (middleware) {
    app.use(path, middleware, route);
  } else {
    app.use(path, route);
  }
});
exports.topsecret = app;
