require('dotenv').config();
// ==============Models require======**
const Register = require("../src/model/user");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


const register = async(req, res) =>{
    try {

    const { email, firstname, lastname, phone, password, confirmpassword, address, language } = req.body;
    const image = req.file;
    if (!email || !firstname || !password || !confirmpassword) {
      return res.status(201).json({ alertMsg: "Please fill in all required fields." });
    }
    if (password !== confirmpassword) {
      return res.status(201).json({ alertMsg: "Passwords do not match." });
    }
    const existingUser = await Register.findOne({ $or: [{ email: email }, { firstname: firstname }] });
    if (existingUser) {
      const existingField = existingUser.email === email ? "Email" : "Firstname";
      return res.status(201).json({ alertMsg: `${existingField} already exists. Please choose a different one.` });
    };
    const registerEmployee = new Register({
        firstname:firstname,
        lastname:lastname,
        email:email,
        phone:phone,
        password:password,
        confirmpassword:confirmpassword,
        image: image ? `images/${image.filename}` : '',
        language:language,
        address:address,
    })
    const token = await registerEmployee.generateAuthToken();
    res.cookie("jwt", token, {
      httpOnly:true
    });
    const registered = await registerEmployee.save();
    
    return res.status(201).json({ alertMsg: "successful registration" });
    
   } catch (error) {
    res.status(201).json({ alertMsg: `data not inserted!` });
        // res.status(400).render("wrongchoice");
   }
};



const login = async(req,res)=>{
    try {
        const { email, password } = req.body;
        console.log(email,password);
        const useremail = await Register.findOne({email:email});
        const passwordMatch = await bcrypt.compare(password, useremail.password);
        const token = await useremail.generateAuthToken();
        console.log(token);
         const user=await Register.findOne({email});
        //  console.log(user);
        // res.cookie("jwt", token, {
        //     // expires:new Date(Date.now() + 300000),
        //     // httpOnly:true,
        //     // secure:false
        // }); 
        res.status(200).cookie('jwt',token,{
          httpOnly:true,
        });
// Cookies.set('jwt', token, { expires: 7 });
        if(passwordMatch){
            req.session.user = useremail;
            res.status(201).json({ success: true, token ,user,errorMsg: `passwordMatch` });
            // res.status(201).json({ success: true,errorMsg: `passwordMatch` });
        }
        else{
            res.status(401).json({ success: false, errorMsg: `! Invalid details` });
        }
    } catch (error) {
        res.status(500).json({ success: false, errorMsg: `data not inserted!` });
    }
};


const profile = async(req,res)=>{
    try {
      // console.log(req.session.user);
      const user=req.session.user;
        // console.log("userdata : ",req.user._id);
        // console.log("req.session.user : ",req.session.user._id);
        // const user = await Register.findById(req.user._id);
        // console.log("user.email",user.email);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        res.json({ user:user});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
};


const logOut = async(req,res, next)=>{
    try {
        res.clearCookie('user');
        req.session.destroy();
        res.redirect("/login"); 
    } catch (error) {
        console.log(error.message);
        res.status(400).render("wrongchoice");
    }
};
module.exports = {
    register,
    login,
    logOut,
    profile,
}