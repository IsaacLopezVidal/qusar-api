const express = require("express");
const app = express();
// const { logger } = require("./config/logger");
const  routes  = require("./routes");
const errors=require('./middleware/errors')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(logger);
routes.forEach(({ path, route, middleware }) => {
  if (middleware) {
    app.use(path, middleware, route);
  } else {
    app.use(path, route);
  }
});
app.all("*",(req,res)=>(res.send(`<center><h1>Pagina no encontrada</h1><br/><hr/><h2>Error 404</h2></center>`)))
app.use(errors)
exports.topsecret = app;
