//! imports
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');



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


const { loginControllerGet,logout } = require('../controllers/users/loginController')
const { passwordControllerGet } = require('../controllers/users/passwordController')
const { isLoggedIn } = require('../middlewares/authMiddlewares')

//! user router
//login
router.route('/login')

    .get(loginControllerGet)



router.route('/password')
    .get(passwordControllerGet)


router.route('/logout')
    .get(logout)


module.exports = router;




