const ValidationError = require('../../error/validationError');
const helperCatch = require('./helperCatch')
const yup = require('yup');

const validSchema=async (req,res, next)=>{
    const schema = yup.object().shape({
      satellites: 
        yup.array().of(
          yup.object().shape({
            name:yup.string().required(),
            distance:yup.number().required(),
            message:yup.array().of(yup.string())
          })
        )
      })
    const valid= schema.isValidSync(req.body);
    if(valid){
      return next()
    }else{
      return next (new ValidationError("No hay suficientes datos para proporcionar informacion"))
    }
  }
  module.exports=helperCatch(validSchema)