let { pool  , createPoolAndEnsureSchema} = require('../config/db');
let { errorInternalServer } = require('../config/constant')
const requestIp = require('request-ip');

const topSecretMiddleware=async (req,res,next) =>{
      try {
        pool = pool || await createPoolAndEnsureSchema();
        const clientIp = requestIp.getClientIp(req);
        const Query =await pool.query(
            `INSERT INTO top_secret (ip,request,method)
             VALUES ('${clientIp}','${JSON.stringify(req.body)}','${req.method}')
            `);

        next();
      } catch (err) {
        console.error(err)
        return res.status(401).json({message:errorInternalServer});
      }
}
module.exports=topSecretMiddleware