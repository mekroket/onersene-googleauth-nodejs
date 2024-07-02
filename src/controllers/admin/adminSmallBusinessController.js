//! imports
const mongoose = require('mongoose');
const Category = require('../../models/category/categoryModel');
const Services = require('../../models/services/servicesModel');
const SmallBusinees = require('../../models/smallBusiness/smallBusiness');


//! get
const adminSBAddGet = async (req, res, next) => {
    const categories = await Category.find();
    const smallBusinees = await SmallBusinees.find();
    res.render('admin/smallBusiness/adminSmallBusinessAdd', { smallBusinees,categories });

}

const adminSBDeleteGet = async (req, res, next) => {
    const categories = await Category.find();
    const smallBusinees = await SmallBusinees.find();
    res.render('admin/smallBusiness/adminSmallBusinessDelete', { smallBusinees,categories });

}




//! post
const SB_add = async (req, res, next) => {
    try {
        const { category, SB_name, SB_city, SB_district, SB_neighbourhood, SB_street, SB_number, SB_provider, SB_availability } = req.body;
        const errors = [];
        const categoryId = req.body.categoryId;

        const reRenderSB = (req, res, next) => {
            console.log(errors);
            res.render('admin/smallBusiness/adminSmallBusinessAdd', {
                errors,
                SB_name,
                SB_city,
                SB_district,
                SB_neighbourhood,
                SB_street,
                SB_number,
                SB_provider,
                SB_availability,
                category
            });
        };




        const image1 = req.files['image1'][0].filename;
        const image2 = req.files['image2'][0].filename;

        const SB = await SmallBusinees.create({
            SB_name,
            SB_city,
            SB_district,
            SB_neighbourhood,
            SB_street,
            SB_number,
            SB_provider,
            SB_availability,
            image1,
            image2,
            categoryId:categoryId
        });
        res.redirect('/');


    } catch (error) {
        next(error);
    }
};


const SB_delete = async (req, res, next) => {
    try {
        const { sbId } = req.body;

        await SmallBusinees.findByIdAndDelete(sbId);

        req.flash('success_delete', 'Kategori Başarıyla Silindi');
        res.redirect('/');

    } catch (error) {
        next(error)
    }
};


const SB_update = async (req, res, next) => {
    try {
        const { sbId, newSB } = req.body;
        console.log(sbId, newSB);

        if (!sbId || !newSB) {
            req.flash('error_msg', 'Lütfen tüm alanları doldurunuz');
            return res.redirect('/');
        }

        const existingSB = await SmallBusinees.findById(sbId);
        if (!existingSB) {
            req.flash('error_msg', 'Güncellenecek Kategori Bulunamadı');
            return res.redirect('/');
        }

        existingSB.sb = newSB;

        req.flash('success_update', 'Güncelleme  İşlemi Başarılı')

        await existingSB.save();

        res.redirect('/');



    } catch (error) {
        next(error);
    }
};


module.exports = {
    SB_add,
    SB_delete,
    SB_update,
    adminSBAddGet,
    adminSBDeleteGet
}