const express = require('express');
const router =express.Router();
const {errorInternalServer} = require('../config/constant')
const Satellites = require('../models/Satelites')

// router.use
router.post('/',async(req,res)=>{
    // if(!satellites){
    //     return res.status(500).json(errorInternalServer);
    // }
    try{
        console.log(req.body)
        const nave = new Satellites(req.body);
        // console.log(nave)
        return res.status(200).json({data:req.body})
     }catch(e){
         console.error(e)
        res.status(500).json(errorInternalServer);
     }
});

module.exports=router;