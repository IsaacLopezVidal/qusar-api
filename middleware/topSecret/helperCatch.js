const MiddlewareError = require('../../error/middlewareError');
function helperCatch(callback){
    return async (req,res,next)=>{
      try{
        await callback(req,res,next)
      }catch(e){
        next(new MiddlewareError())
      } 
    }
  }
module.exports=helperCatch;