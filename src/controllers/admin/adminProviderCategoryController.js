//! imports
const mongoose = require('mongoose');
const Category = require('../../models/category/categoryModel');
const Services = require('../../models/services/servicesModel');
const smallBusinees = require('../../models/smallBusiness/smallBusiness');
const providerCategoryModel = require('../../models/category/providerCategoryModel');

const providerAdd = async (req, res, next) => {
    try {
        const { Pr_categoryDate, Pr_categoryImage, Pr_categoryContent, Pr_categoryName } = req.body;
        const errors = [];

        const reRenderSB = (req, res, next) => {
            console.log(errors);
            res.render('adminProvider', {
                Pr_categoryName,
                Pr_categoryImage,
                Pr_categoryContent,
                Pr_categoryDate

            });
  
        };

        if (!Pr_categoryDate || !Pr_categoryImage || !Pr_categoryContent || !Pr_categoryName) {
            errors.push({ msg: 'Lütfen tüm alanları uygun şekilde doldurunuz' });
            reRenderProvider(req, res, next);
        } else {
            const existingProvider = await providerCategoryModel.findOne();
            if (existingProvider) {
                errors.push({msg:'Sağlayıcı Zaten Mevcut'});
                reRenderProvider(req,res,next);
            } else {
                const Provider = await providerCategoryModel.create(
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

const providerDelete = async (req,res,next)=>{
    try {
        const {providerId} = req.body;

        await providerCategoryModel.findByIdAndDelete(providerAdd);

        req.flash('success_delete','Sağlayıcı Başarıyla Silindi');
        res.redirect('/');

    } catch (error) {
        next(error);
    }
}


const providerUpdate = async (req,res,next)=>{
    try {
        const {providerId,newProvider} = req.body;
        console.log(providerId,newProvider);

        if (!providerId || !newProvider) {
            req.flash('error_msg','Lütfen tüm alanları doldurunuz');
            return res.redirect('/');
        }

        const existingProvider = await providerCategoryModel.findById(providerId);
        if (!existingProvider) {
            req.flash('error_msg','Güncellenecek Sağlayıcı Bulunamadı');
            return res.redirect('/');
        }

    } catch (error) {
        next(error);
    }
}



module.exports={
    providerAdd,
    providerDelete,
    providerUpdate
}