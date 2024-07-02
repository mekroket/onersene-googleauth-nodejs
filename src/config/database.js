const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING,{useUnifiedTopology: true,useNewUrlParser: true})
    .then(()=>console.log("Database Connection Succesfuly"))
    .catch(error => console.log(`Database Connection Error ${error}` ))

