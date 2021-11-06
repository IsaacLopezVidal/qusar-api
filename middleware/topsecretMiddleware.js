let { pool  , createPoolAndEnsureSchema} = require('../config/db');
let { errorInternalServer } = require('../config/constant')
const requestIp = require('request-ip');
const yup = require('yup')
const  Satellite = require('../models/Satelite')

function helperCatch(callback){
  return async (req,res,next)=>{
    try{
      await callback(req,res,next)
    }catch(e){
      return res.status(401).json({
        status:"error",
        message:errorInternalServer
      })
    } 
  }
}

const topSecretMiddleware=async (req,res,next) =>{
  pool = pool || await createPoolAndEnsureSchema();
  const clientIp = requestIp.getClientIp(req);
  const Query =await pool.query(
      `INSERT INTO top_secret (ip,request,method)
        VALUES ('${clientIp}','${JSON.stringify(req.body)}','${req.method}')
      `);
  next();
}

const validSchema=async (req,res, next)=>{
  const schema = yup.object().shape({
    satellites: yup.array().of<Satellite>({
      name:yup.string().required(),
      distance:yup.number().required(),
      message:yup.array().of(yup.string())
    })
  });
  if(await schema.isValid(req.body).then(res=>res)){
    return next()
  }else{
    return res.status(300).json("Error en payload")
  }
}

module.exports={
  topSecretMiddleware:helperCatch(topSecretMiddleware),
  validSchema:helperCatch(validSchema),
  helperCatch
}