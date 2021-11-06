const express = require('express');
const router =express.Router();
const {errorInternalServer} = require('../config/constant')
const Satellites = require('../models/Satelites')


router.post('/',async(req,res)=>{
    const nave = new Satellites(req.body);
    return res.status(200).json({data:req.body})
});

module.exports=router;