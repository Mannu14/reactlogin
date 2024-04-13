const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config();

// const isLogin = async(req,res,next)=>{
//     try {
//         if(req.session.user){}
//         else{
//              res.redirect('/login')}
//         next();
//     } catch (error) {
//         console.log(error.message);
//     }
// }


// const Authenticate = async (req,res,next)=>{
//     try {
//         // const token = req.cookies.jwt;
//         const token = await request.headers.authorization.split(" ")[1];
//         console.log(token);
//         const veriftToken = jwt.verify(token, process.env.SECRET_KEY);
//         const rootUser = await User.findOne({_id:veriftToken._id, "tokens.token": token});
//         if(!rootUser){throw new Error('User not Found')};

//         req.token = token;
//         req.rootUser = rootUser;
//         req.userID = rootUser._id;
//         console.log(req.userID);

//         next();
        
//     } catch (error) {
//         res.status(401).json({ error: "Unauthorized isLogin" });
//     }
// };

const Authenticate = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(req.cookies);
    // console.log(req.session.user.email);
  
    if (!token) {
        console.log("no token");
      return res.status(401).json({ error: 'Unauthorized' }); // User is not logged in
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log("token h :",decoded);
      req.user = decoded.user; // Add user data to the request object
      next();
    } catch (error) {
        console.log("catch error");
      return res.status(401).json({ error: 'Invalid token' }); // Invalid token
    }
  };

const isLogin = async (req, res, next) => {
    try {
      if (req.session.user) {
        next(); // Proceed to the next middleware/route
      } else {
        console.log("Unauthorized isLogin",req.session.user);
        res.status(401).json({ error: "Unauthorized isLogin" });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Server Error isLogin" });
    }
  };

const isLogout = async(req,res,next)=>{
    try {
        if(req.session.user){
            res.redirect('/quize')
        }
        next();
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    isLogin,
    isLogout,
    Authenticate
}