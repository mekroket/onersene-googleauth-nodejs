//! imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const smallBusineesSchema = new Schema({
    SB_name:{
        type:String,
        required: true
    },
    SB_city:{
        type:String,
        required:true
    },
    SB_district :{
        type: String,
        required:true
    },
    SB_neighbourhood : {
        type:String,
        required:true
    },
    SB_street  :{
        type:String,
        required:true
    },
    SB_number :{
        type:String,
        required:true
    },
    SB_provider:{
        type:String,
        required:true
    },
    SB_availability:{
        type:Boolean,
        required:true
    },
    image1:{
        type:String,
        required:true
    },
    image2:{
        type:String,
        required:true
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

},{collection:'smallBusiness',timestamps:true});


const smallBusinees = mongoose.model('smallBusiness',smallBusineesSchema);

module.exports = smallBusinees