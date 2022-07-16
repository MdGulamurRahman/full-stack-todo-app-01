//dependencies
const User = require("../../models/User")
const { hashStr } = require("../../utilities/utilities");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
// controller obj
const auth = {}

//signup controller
auth.signupPageHandler = (req,res)=>{
    try {
        res.render('auth/signup')
    } catch (error) {
        throw error
    }
}
// signup post controller
auth.signupPostHandler = async (req,res)=>{
    try {
       const {name, email, password} = req.body;
       const user = new User({
        name,
        email,
        password: await hashStr(password)
       });
       const result =  await user.save();
       res.render('signupdone')
    } catch (error) {
        throw error
    }
}
// loginpage controller
auth.loginPageHandler = (req,res)=>{
    try {
        res.render('auth/login', {err: null, email: null, emailErr: false, passwordErr: false})
    } catch (error) {
        throw error
    }
};
// loginpage controller
auth.loginPostHandler = async (req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(user){
            const isMatched = await bcrypt.compare(password, user.password);
            if(isMatched){
                const token = await jwt.sign({email}, process.env.JWT_SECRETE, {expiresIn: "1h"});
                res.cookie('access_token', "Bearer " + token, {signed: true, httpOnly:true, secure:true});
                res.redirect('/')
            }else{
                res.render("auth/login", {email, emailErr: false, passwordErr: true, err: "Wrong Password"})
            }
        }else{
            res.render("auth/login", {email, emailErr: true, passwordErr: false, err: "User not found!"})
        }
    } catch (error) {
        throw error
    }
};

auth.logoutHandler = (req,res)=>{
    try {
        res.clearCookie('access_token');
        res.redirect('/login')
    } catch (error) {
        throw error
    }
}

module.exports = auth;