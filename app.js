
const express = require('express');
const app = express();
// const {logger} = require('./config/logger')
let { pool  , createPoolAndEnsureSchema} = require('./config/db');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
// app.use(async (req, res, next) => {
//    if (pool) {
//      return next();
//    }
//    try {
//      pool = await createPoolAndEnsureSchema();
//      next();
//    } catch (err) {
//    //   logger.error(err);
//       console.error(err)
//      return next(err);
//    }
//  });
app.get('/', async function(req, res){
   // logger.info("Entro a principal");
   try{
      console.log(process.env.DB_HOST)
      // pool = pool || (await createPoolAndEnsureSchema());
      // const Query =await pool.query(
      //    'SELECT resques_id,request,ip,time_cast FROM top_secret ORDER BY time_cast DESC LIMIT 5'
      //  );
      //  var string=JSON.stringify(Query);
      //  var json =  JSON.parse(string);
       res.send(process.env,200);
   }catch(e){
      console.log(e)
   }
});
exports.topsecret=app;