const yup = require('yup');
const ValidationError = require('../../error/validationError');
const helperCatch = require('../topSecret/helperCatch')

const validSchemaPOST_GET=async (req,res, next)=>{
    const {name} = req.params
    if(!name) return(new ValidationError("No hay suficiente información"))
    const schema = yup.object().shape({
            distance:yup.number().required(),
            message:yup.array().of(yup.string())
    });
    const valid= schema.isValidSync(req.body);
    if(valid){
      return next()
    }else{
      return next (new ValidationError("No hay suficientes datos para proporcionar informacion"))
    }
  }
  module.exports=helperCatch(validSchemaPOST_GET);