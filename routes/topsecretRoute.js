const express = require('express');
const router =express.Router();
const validationSchema = require('../middleware/topSecret/validationSchema')
const topSecretError = require('../error/topSecretError')
const Satellites = require('../models/Satelites')
const GetMessage = require('../services/message')
const GetLocation = require('../services/location')
const Nave = require('../models/Nave');
const Posicion = require('../models/Posicion');

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
    const distances=[]
    const _nave= new Nave()
    _satellites.forEach(e=>messages.push(e.message))
    _satellites.forEach(e=>distances.push(e.distance))
    _nave.message = GetMessage(messages)
    _nave.position=GetLocation(distances);
    // _nave.position = new Posicion()
    return res.status(200).json(_nave)
}));


module.exports=router;