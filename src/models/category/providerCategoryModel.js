//! imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//! Pr_categorySchema
const ProviderCategorySchema = new Schema({
    Pr_categoryName: {
        type: String,
        required: true
    },
    Pr_categoryImage: {
        type: String,
        required: true
    },
    Pr_categorySliderImage:{
        type:String,
        required:true
    },
    Pr_categoryContent:{
        type:String,
        required:true
    },
    Pr_categoryDate:{
        type: Number
    }
    
    
}, { collection: 'Pr_category', timestapms: true });

const Pr_category = mongoose.model('Pr_Category', ProviderCategorySchema);


module.exports = Pr_category