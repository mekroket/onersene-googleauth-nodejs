//! imports
const mongoose = require('mongoose');
const Category = require('../../models/category/categoryModel');
const Services = require('../../models/services/servicesModel');
const smallBusinees = require('../../models/smallBusiness/smallBusiness');
const providerCategoryModel = require('../../models/category/providerCategoryModel');
const popularCategoryModel = require('../../models/category/popularCategoryModel');


const popularCategoryAdd = async (req,res,next)=>{
    try {
        const {P_categoryName,P_categoryImage} = req.body;
        const errors = [];
        
        const reRenderPopularCategory = (req,res,next)=>{
            console.log(errors);
            res.render('adminPopularCategory',{
                P_categoryName,
                P_categoryImage
            });
        };
        if (!P_categoryImage|| !P_categoryName) {
            errors.push({msg : 'Lütfeb Tüm alanları Uygun Şekilde Doldurunuz'});
            reRenderPopularCategory(req,res,next);
        } else {
            const existingPopularCategory = await providerCategoryModel.findOne();
            if (existingPopularCategory) {
                errors.push({msg:'Sağlayıcı Zaten Mevcut'});
                reRenderPopularCategory(req,res,next);
            } else {
                const popularCategory = await popularCategoryModel.create(
                    req.body
                );
                req.flash(
                    'success_msg',
                    'Sağlayıcı Başarıyla Eklendi'

                );
                res.redirect('/');
            }
        }

    } catch (error) {
        next(error);
    }
}

const popularCategoryDelete = async (req,res,next)=>{
    try {
        const {popularCategoryId} = req.body;

        await popularCategoryModel.findOneAndDelete(popularCategoryId);
        
        req.flash('success_delete','Kategori Başarıyla Silindi');
        res.redirect('/');
    } catch (error) {
        next(error);
    }
}

const popularCategoryUpdate = async (req,res,next)=>{
    try {
        const {popularCategoryId,newPopularCategory} = req.body;
        console.log(popularCategoryId,newPopularCategory);

        if (!popularCategoryId || ! newPopularCategory) {
            req.flash('error_msg','Lütfen tüm alanları doldurunuz');
            return res.redirect('/');

        };

        const existingPopularCategory = await popularCategoryModel.findById(popularCategoryId);
        if (!existingPopularCategory) {
            req.flash('error_msg','Güncellenecek Kategori Bulunamadı');
            return res.redirect('/');
        }


    } catch (error) {
        next(error);
    }
}



module.exports = {
    popularCategoryAdd,
    popularCategoryDelete,
    popularCategoryUpdate
}