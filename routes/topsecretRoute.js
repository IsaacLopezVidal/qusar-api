const express = require('express');
const router =express.Router();
const topsecretMiddleware = require('../middleware/topSecret/topsecretMiddleware')
const validationSchema = require('../middleware/topSecret/validationSchema')
const topSecretError = require('../error/topSecretError')
const Satellites = require('../models/Satelites')
const GetMessage = require('../services/message')
const MessageError = require('../error/messageError')

function helperCatch(callback){
    return async (req,res,next)=>{
      try{
        await callback(req,res,next)
      }
      catch(e){
        console.log(e)
        const newError=new topSecretError(e)
        if(e.name===newError.name)
          next(newError)
        next(e)
      } 
    }
  }

router.post('/',validationSchema,helperCatch(async(req,res)=>{
    const {satellites} = req.body
    const {satellites:_satellites} = new Satellites(satellites);
    const messages=[]
    _satellites.forEach(e=>messages.push(e.message))
    GetMessage(messages)
    return res.status(200).json({data:req.body})
}));


module.exports=router;