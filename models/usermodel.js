const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    mail: {type:String, unique:true},
    image:{type:String}
})

module.exports = mongoose.model('user',userSchema);