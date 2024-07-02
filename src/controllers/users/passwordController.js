//! imports
const mongoose = require('mongoose');

//! get
const passwordControllerGet = async (req, res, next) => {
    res.render('users/password');

}

module.exports = {
    passwordControllerGet
}