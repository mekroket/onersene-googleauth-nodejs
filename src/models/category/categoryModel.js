//! imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//User Schema
const CategorySchema = new Schema({
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
    
}, { collection: 'category', timestapms: true });

const Category = mongoose.model('Category', CategorySchema);


module.exports = Category;