//! imports
const mongoose = require('mongoose');
const Category = require('../models/category/categoryModel');



const CategoryController =  async (req,res,next)=>{
    try{
        const categories = await Category.find();

        res.render('home',{categories})
    }catch (err){
        res.status(500).json({message:err.message});
    }
}

module.exports = {
    CategoryController
}