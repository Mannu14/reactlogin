require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
var cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("../src/middleware/auth");
const jwt = require("jsonwebtoken");
const { json } = require("express");
var session = require('express-session');

// ======= for current user =====
const { SESSION_SECRET } = process.env;
app.use(session({secret:SESSION_SECRET}));

// ======= for current user end =====


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Include cookies in cross-origin requests
  }));



const Images_path = path.join(__dirname, "../public/images");
app.use(express.static(Images_path));


const multer = require('multer');

const storageprofile = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'public/images');
    },
    filename:function(req,file,cb){
        const name = file.originalname + '-' + Date.now()
        cb(null,name);
    }
});
const uploadprofile = multer({storage:storageprofile});

const userController = require('../Controller/userController');

app.post("/register",uploadprofile.single('image'), userController.register);

app.post('/login',userController.login);

app.get("/profile",auth.Authenticate,userController.profile);

module.exports = app;