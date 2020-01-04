const mongoose = require('mongoose');
const Joi = require('joi');


const PersonalInformation = {
    title:  {type:String,required:true},
    surnameAsPerPassport: {type:String,required:true},
    nameAsPerPassport: {type:String,required:true},
    dob: {type:String,required:true},
    passportNumber: {type:Number,required:true},
    visaNumber: {type:Number,required:true}
}
const formSchema = new mongoose.Schema(

    {

        typeofTravel: {type: String, required: true},
        tofVisa: {type:String, required: true},
        spouse: {type:Boolean, default: false},
        children: {type:Boolean, default: false},
        ccount: {type:Number, min:0,default:0},
        from: {type:String, required: true},
        to: {type:String, required:true},
        startDate: {type:String, required:true},
        endDate: {type:String, required: true},
        accomodationReq: {type:Boolean, default: false},
        findUrl: String,
        info: {  
            title:  {type:String,required:true},
            surnameAsPerPassport: {type:String,required:true},
            nameAsPerPassport: {type:String,required:true},
            dob: {type:String,required:true},
            passportNumber: {type:Number,required:true},
            visaNumber: {type:Number,required:true},
        },
        address:{type:String,required:true},
        sinfo: {
            title:  {type:String,required:function () { return this.spouse}},
            surnameAsPerPassport: {type:String,required:function () { return this.spouse}},
            nameAsPerPassport: {type:String,required:function () { return this.spouse}},
            dob: {type:String,required:function () { return this.spouse}},
            passportNumber: {type:Number,required:function () { return this.spouse}},
            visaNumber: {type:Number, required: function () { return this.spouse}},
         },
        cinfo : { type: [PersonalInformation], required: function () { 
            av = (this.children  || (this.ccount > 0 ? true: false)); 
            console.log(av);
            return av;
            }, validate: {
                validator: function(value){
                    if(this.children || this.ccount > 0){
                        if(value.length === this.ccount){
                            return true;
                        }
                        return false;
                    }
                }
            }},
        iName: {type:String,required:true},
        relationShip: {type:String,required:true},
        uploadvisa:{type:String,required:true},
        uploadpassport: {type:String,required:true},
        comments: {type:String, required: true},
        laddress: {type:String,required: true},
        purposeofstay: {type:String, required: true},
        Files :  {
            findUrlmanager: String,
            uploadvisamanager: String,
            uploadpassportmanager: String
            }
}

)


module.exports.formSchema = formSchema;