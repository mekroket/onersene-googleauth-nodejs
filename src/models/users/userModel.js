//! imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//User Schema
const UserSchema = new Schema({

    googleId: String, // Google'dan gelen benzersiz kimlik
    username : String,
    email:String


}, { collection: 'user', timestapms: true });

const User = mongoose.model('User', UserSchema);


module.exports = User;