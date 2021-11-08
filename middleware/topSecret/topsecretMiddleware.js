let { pool  , createPoolAndEnsureSchema} = require('../../config/db');
const requestIp = require('request-ip');
const helperCatch = require('./helperCatch')

const topSecretMiddleware=async (req,res,next) =>{
  pool = pool || await createPoolAndEnsureSchema();
  const clientIp = requestIp.getClientIp(req);
  const Query =await pool.query(
      `INSERT INTO top_secret (ip,request,method)
        VALUES ('${clientIp}','${JSON.stringify(req.body)}','${req.method}')
      `);
  next();
}
module.exports=helperCatch(topSecretMiddleware)