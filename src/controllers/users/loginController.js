//! imports
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const dotenv = require('dotenv').config();
const User = require('../../models/users/userModel')



//!get
const loginControllerGet = async (req, res, next) => {
    return res.render('users/login');
};

const logout = (req, res, next) => {
  req.session.isLoggedIn = false; // Giriş yapılmadığını belirtmek için isLoggedIn değişkenini false olarak ayarla
  req.session.destroy((err) => {
      if (err) {
          console.log(err);
      }
      res.redirect('/');
  });
};
  







module.exports = {
    loginControllerGet,
    logout
    
}