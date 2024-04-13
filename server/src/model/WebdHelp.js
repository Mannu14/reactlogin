const mongoose = require('mongoose');

const WebdHelpSchema = new mongoose.Schema({
    userEmailId:{
        type:String,
        ref:'user'
    },
    userImgage:{
        type:String,
        ref:'user'
    },
    address:{
        type:String,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageFile:{
        type:String,
    },
},
{timestamps:true}
);
module.exports = mongoose.model('WebdHelp', WebdHelpSchema);