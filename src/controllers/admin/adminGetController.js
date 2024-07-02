const mongoose = require('mongoose');




const adminPageGet = async (req,res,next) =>{
    res.render('admin/adminHome')
}


module.exports = adminPageGet