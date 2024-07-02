//! imports
const mongoose = require('mongoose');

//! get
const adminLoginControllerGet = async (req, res, next) => {
    res.render('admin/adminLogin');

}

module.exports = {
    adminLoginControllerGet
}