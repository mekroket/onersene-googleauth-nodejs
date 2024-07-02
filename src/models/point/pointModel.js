//! imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PointSchema = new Schema({
    serviceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Services'
    },
    SB_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SmallBusiness'
    },
    point:{
        type:Number
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{collection:'Point',timestamps:true});

const Point = mongoose.model('Point',PointSchema);

module.exports = Point