//! imports
const mongoose = require('mongoose');
const Category = require('../../models/category/categoryModel');
const Services = require('../../models/services/servicesModel')
const SmallBusinees = require('../../models/smallBusiness/smallBusiness')


//! get
const adminServiceAddGet = async (req, res, next) => {
    const categories = await Category.find();
    const services = await Services.find();
    const smallBusiness = await SmallBusinees.find();
    res.render('admin/services/adminServicesAdd', { services, categories, smallBusiness });

}

const adminServiceDeleteGet = async (req, res, next) => {
    const categories = await Category.find();
    const services = await Services.find();
    const serviceId = req.params.id;
    const service = await Services.findById(serviceId)
    const smallBusiness = await SmallBusinees.find();
    res.render('admin/services/adminServicesDelete', { services, categories, smallBusiness,serviceId });

}

const adminServiceUpdateGet = async (req, res, next) => {
    const categories = await Category.find();
    const services = await Services.find();
    const smallBusiness = await SmallBusinees.find();
    res.render('admin/services/adminServicesUpdate', { services, categories, smallBusiness });

}




//! post
const serviceAdd = async (req, res, next) => {
    try {
        const { category, serviceName, servicePrice, serviceBrand, serviceContent, serviceImage1, serviceImage2, serviceImage3 , isPopular} = req.body;
        const errors = [];
        const smallBusinessId = req.body.smallBusinessId;

        

        const reRenderSeviceAdd = () => {
            console.log(errors);
            res.render('home', {
                errors,
                serviceName,
                servicePrice,
                serviceBrand,
                serviceContent,
                category,
                serviceImage1,
                serviceImage2,
                serviceImage3,
                isPopular
            }) //! bu kısım değişicek
            
        };


        if (!serviceName, !servicePrice, !serviceBrand, !serviceContent) {
            errors.push({ msg: 'Lütfen tüm alanları uygun şekilde doldurunuz' })
            reRenderSeviceAdd();
        } else {

            const image1 = req.files['image1'][0].filename;
            const image2 = req.files['image2'][0].filename;
            const image3 = req.files['image3'][0].filename;

            
            

            const createService = await Services.create({
                serviceName,
                servicePrice,
                serviceBrand,
                serviceContent,
                category,
                serviceImage1: image1, // Yüklenen dosya adını kullanın
                serviceImage2: image2, // Yüklenen dosya adını kullanın
                serviceImage3: image3, // Yüklenen dosya adını kullanın
                isPopular,
                smallBusineesId: smallBusinessId
                
            });


            // hizmet ekleme sayfasında listelenen hizmetlerden sadece o hizmetleri ekleyen kişinin id si ise hizmetleri gösterecek
            // yani sadece o hizmeti ekleyen kişi o hizmeti görebilecek

            //req.flash('success_service', 'Hizmet Başarıyla Eklendi');
            res.redirect('/');
        }



    } catch (error) {
        next(error);
    }
}

const serviceDelete = async (req, res, next) => {
    try {
        const { serviceId } = req.body;
        await Services.findByIdAndDelete(serviceId);

        //req.flash('success_delete', 'Hizmet başarıyla silindi');
        res.redirect('/');
    } catch (error) {
        next(error);
    }
}

const serviceUpdate = async (req, res, next) => {
    try {
        const { serviceId, newServices } = req.body;
        console.log(serviceId, newServices);

        if (!serviceId || !newServices) {
            console.log('Tüm alanları doldurun');
            // req.flash('error_msg', 'Lütfen Tüm Alanları Doldurunuz');
            return res.redirect('/');
        }

        const existingService = await Services.findById(serviceId);
        if (!existingService) {
            console.log('Güncellenecek kayıt bulunamadı');
            // req.flash('error_msg', 'Güncellenecek Kategori Bulunamadı');
            return res.redirect('/');
        }

        // Özellikleri güncelle
        existingService.serviceName = newServices.serviceName;
        existingService.isPopular = newServices.isPopular;
        existingService.smallBusineesId = newServices.smallBusineesId;
        existingService.servicePrice = newServices.servicePrice;
        existingService.serviceBrand = newServices.serviceBrand;
        existingService.serviceContent = newServices.serviceContent;
        existingService.serviceImage1 = newServices.serviceImage1;
        existingService.serviceImage2 = newServices.serviceImage2;
        existingService.serviceImage3 = newServices.serviceImage3;

        // req.flash('sucess_update', 'Güncelleme İşlemi Başarılı');

        await existingService.save();
        res.redirect('/')

    } catch (error) {
        next(error);
    }
}




module.exports = {
    serviceAdd,
    serviceDelete,
    serviceUpdate,
    adminServiceAddGet,
    adminServiceDeleteGet,
    adminServiceUpdateGet
}