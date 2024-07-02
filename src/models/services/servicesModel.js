//! imports
const mongoose = require('mongoose');
const { collection } = require('../category/categoryModel');
const Schema = mongoose.Schema;




const ServicesSchema = new Schema({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    serviceName:{
        type:String,
        required:true
    },
    pointId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Point',
    },
    popularServiceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PopularService'

    },
    isPopular: {
        type: Boolean,
        default: false // Varsayılan olarak popüler değil
    },
    smallBusineesId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'smallBusiness'
    },
    servicePrice:{
        type:Number,
        required:true
    },
    serviceBrand:{
        type:String,
        required:true,
    },
    serviceContent:{
        type:String,
        required:true,
    },
    serviceImage1:{
        type:String,
        required:true
    },
    serviceImage2:{
        type:String,
        required:true
    },
    serviceImage3:{
        type:String,
        required:true
    }

},{collection:'services',timestamps:true});

const Services = mongoose.model('Services',ServicesSchema);

module.exports = Services