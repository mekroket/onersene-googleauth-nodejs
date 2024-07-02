//! imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//! P_categorySchema
const PopularCategorySchema = new Schema({
    P_categoryName: {
        type: String,
        required: true
    },
    P_categoryImage: {
        type: String,
        required: true
    }
    
}, { collection: 'P_category', timestapms: true });

const P_category = mongoose.model('P_Category', PopularCategorySchema);


module.exports = P_category