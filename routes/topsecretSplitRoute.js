const express = require('express');
const router =express.Router();
const GetMessage = require('../services/message')
const GetLocation = require('../services/location')
const TopSecretSplitError = require('../error/topSecretSplitError')
const validationSchema = require('../middleware/topSecretSplit/validationSchema')
const Nave = require('../models/Nave');
function helperCatch(callback){
    return async (req,res,next)=>{
      try{
        await callback(req,res,next)
      }
      catch(e){
        const newError=new TopSecretSplitError(e)
        if(e.name===newError.name)
          next(newError)
        next(e)
      } 
    }
  }

router.post("/:name",validationSchema,helperCatch(async (req,res)=>{
    const {distance,message} = req.body;
    const {name} = req.params;
    const messages=[];
    const distances=[];
    const _nave= new Nave()
    messages.push(message);
    distances.push(distance);
    _nave.message = GetMessage(messages)
    _nave.position= await GetLocation(distances);
    return res.status(200).json(_nave)
}))

module.exports=router;