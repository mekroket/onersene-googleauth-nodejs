//! imports
const mongoose = require('mongoose');
const { collection } = require('../category/categoryModel');
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    smallBusinessId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SmallBusiness'
    },
    commentDate:{
        type: new Date()
    },
    pointId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Point'
    },
    commentContent:{
        type:String,
        require:true
    }
},{collation:'comment',timestamps:true});

const Comment = mongoose.model('Comment',CommentSchema);

module.exports = Comment