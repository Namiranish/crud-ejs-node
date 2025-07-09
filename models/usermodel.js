const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://anisnamira:S70tFBrurdVvSLC1@crud-namira.pommjle.mongodb.net/?retryWrites=true&w=majority&appName=crud-namira')

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    mail: {type:String, unique:true},
    image:{type:String}
})

module.exports = mongoose.model('user',userSchema);