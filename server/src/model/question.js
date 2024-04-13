const mongoose = require('mongoose');

const QuestionsSchema = new mongoose.Schema({
    
    sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    Quiz_Total_Marks:{
        type:String,
        required:true
    },
    Total_Question_in_Quiz:{
        type:String,
        required:true
    },
    questionnum:{
        type:String,
        required:true
    },
    Question:{
        type:String,
        required:true
    },
    questionMarks:{
        type:String,
        required:true
    },
    user_answer:{
        type:String,
        required:true
    },
    correct_Ans:{
        type:String,
        required:true
    }
},
{timestamps:true}
);
module.exports = mongoose.model('Quiz-Question', QuestionsSchema);