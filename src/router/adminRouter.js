//! imports
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const { adminCategoryAddGet, adminCategoryUpdateGet, adminCategoryDeleteGet, categoryAdd, categoryDelete, categoryUpdate } = require('../controllers/admin/adminCategoryController');
const { adminServiceUpdateGet, adminServiceDeleteGet, adminServiceAddGet, serviceAdd, serviceDelete, serviceUpdate } = require('../controllers/admin/adminServicesController');
const { adminSBDeleteGet, adminSBAddGet, SB_add, SB_delete, SB_update } = require('../controllers/admin/adminSmallBusinessController');
const { providerAdd, providerDelete, providerUpdate } = require('../controllers/admin/adminProviderCategoryController');
const { popularCategoryAdd, popularCategoryUpdate, popularCategoryDelete } = require('../controllers/admin/adminPopularCategoryController');
const {  adminLoginControllerGet} = require('../controllers/admin/adminLoginController')



const adminPageGet = require('../controllers/admin/adminGetController');


//! image add code
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Resimlerin kaydedileceği klasörü belirtin
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Resim dosyasının adını belirleyin
    }
});

const upload = multer({ storage: storage });





//! home router
router.route('/')
    .get(adminPageGet)
    .post()



//! category
router.route('/category/add')
    .get(adminCategoryAddGet)
    .post(upload.single('image'), categoryAdd);



router.route('/category/delete')
    .get(adminCategoryDeleteGet)
    .post(categoryDelete)


router.route('/category/update')
    .get(adminCategoryUpdateGet)
    .post(upload.single('image'), categoryUpdate)


//////////////////////////////////////////////////



//! service
router.route('/service/add')
    .get(adminServiceAddGet)
    .post(upload.fields([{ name: 'image1' }, { name: 'image2' }, { name: 'image3' }]), serviceAdd)


router.route('/service/delete')
    .get(adminServiceDeleteGet)
    .post(upload.fields([{ name: 'image1' }, { name: 'image2' }]), serviceDelete)


router.route('/service/update')
    .get(adminServiceUpdateGet)
    .post(serviceUpdate)


/////////////////////////////////////////////////


//! SB_router
router.route('/sb/add')
    .get(adminSBAddGet)
    .post(upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), SB_add)



router.route('/sb/delete')
    .get(adminSBDeleteGet)
    .post(SB_delete)


router.route('/sb/update')
    .get()
    .post(SB_update)



///////////////////////////////////////


//! provider
router.route('/provider/add')
    .get()
    .post(providerAdd)


router.route('/provider/delete')
    .get()
    .post(providerDelete)


router.route('/provider/update')
    .get()
    .post(providerUpdate)





//////////////////////////////////////////////

//! popular category
router.route('/popularCategory/add')
    .get()
    .post(popularCategoryAdd)


router.route('/popularCategory/delete')
    .get()
    .post(popularCategoryDelete)


router.route('/popularCategory/update')
    .get()
    .post(popularCategoryUpdate)



//! popular category
router.route('/login')
    .get(adminLoginControllerGet)
    


module.exports = router