const mongoose = require('mongoose');
const Category = require('../../models/category/categoryModel');





//! get
const adminCategoryAddGet = async (req, res, next) => {
    const categories = await Category.find();
    res.render('admin/category/adminCategoryAdd', { categories });

}

const adminCategoryDeleteGet = async (req, res, next) => {
    const categories = await Category.find();
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    
    res.render('admin/category/adminCategoryDelete', { categories,categoryId });

}


const adminCategoryUpdateGet = async (req, res, next) => {
    const categories = await Category.find();
    res.render('admin/category/adminCategoryUpdate', { categories });

}






//! post

const categoryAdd = async (req, res, next) => {
    try {
        const { category,image } = req.body;
        const errors = [];

        const reRenderCategory = (req,res,next) => {
            console.log(errors);
            res.render('adminCategoryAdd', {
                errors,
                category,
                image
            })
        }

        if (!category) {
            errors.push({ msg: 'Lütfen Tüm Alanları Uygun Şekilde Doldurunuz !' })
            reRenderCategory();
        } else {
            const existingCategory = await Category.findOne({ category });
            if (existingCategory) {
                errors.push({ msg: 'Kategori Zaten Mevcut' });
                reRenderCategory();
            } else {
                const image = req.file.filename;
                const createCategory = await Category.create({category,image});
                //req.flash('success_add','Kategori Başarıyla Eklendi')
                res.redirect('/admin/category/add');
            }
        }


    } catch (error) {
        next(error)
    }
};

const categoryDelete = async (req, res, next) => {
    try {
        const { categoryId } = req.body;

        await Category.findByIdAndDelete(categoryId);

        //req.flash('success_delete','Kategori Basşarıyla Silindi')
        res.redirect('/admin/category/delete')

    } catch (error) {
        next(error)
    }
}

const categoryUpdate = async (req, res, next) => {

    try {
        const { categoryId, newCategory } = req.body;
        console.log(categoryId, newCategory);


        if (!categoryId || !newCategory) {
            console.log("Tüm alanları doldurunuz");
            console.log(categoryId);
            console.log(newCategory);
            //req.flash('error_msg', 'Lütfen tüm alanları doldurunuz!');
            return res.redirect('/');
        }

        const existingCategory = await Category.findById(categoryId);
        if (!existingCategory) {
            //req.flash('error_msg', 'Güncellenecek Kategori Bulunamadı');
            return res.redirect('/admin/category/update');
        }

        existingCategory.category = newCategory;

        if (req.file) {
            existingCategory.image = req.file.filename;
        }

        //req.flash('success_update', 'Güncelleme İşlemi Başarılır');

        await existingCategory.save();

        res.redirect('/admin/category/update');
    } catch (error) {
        next(error);
    }




}



module.exports = {
    categoryAdd,
    categoryDelete,
    categoryUpdate,
    adminCategoryAddGet,
    adminCategoryDeleteGet,
    adminCategoryUpdateGet
}