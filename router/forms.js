const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const _ = require('lodash');
const Joi = require('joi');
const {formSchema} = require('../models/form');



const Form = mongoose.model('Form',formSchema);



router.post('/',async(req,res) => {
   console.log(req.body.typeofTravel);
    const form = new Form(_.pick(req.body,['typeofTravel','tofVisa','spouse','children','ccount','from','to','startDate','endDate','accomodationReq','findUrl','info','address','sinfo', 'cinfo' , 'iName','relationShip', 'uploadvisa','uploadpassport','comments','laddress','purposeofstay','Files']));
    await form.save();
    console.log(form);
    res.send(form);
 
});


router.get('/',async(req,res) => {

    try{
        const forms = await Form.find();
        res.send(forms)
    }catch(err){
        console.log(err);
    }
});



















module.exports = router;