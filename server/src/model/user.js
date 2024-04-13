const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        unique:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
           type:String,
           required:true
        }
    }]
},
{timestamps:true});

employeeSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    } catch (error) {
        console.error("Error generating auth token:", error);
        throw new Error("Error generating auth token");
        // res.send("the erroe"+error);
    }
}

employeeSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10);
    }
    next();
});

const Register = new mongoose.model("users", employeeSchema);
module.exports = Register;