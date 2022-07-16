const jwt = require('jsonwebtoken')

async function authChecker(req,res,next){
    try {
        if(req.signedCookies.access_token){
            const token = req.signedCookies.access_token.split(' ')[1]
            const verifyToken = await jwt.verify(token, process.env.JWT_SECRETE);
            req.email = verifyToken.email;
            if(req.url === '/login' || req.url === '/signup'){
                return res.redirect('/')
            }
            next()
        }else{
            if(req.url === '/signup'){
                return res.render('auth/signup',  {email:null, emailErr: false, passwordErr: false, err: null})
            }
            res.render('auth/login',  {email:null, emailErr: false, passwordErr: false, err: null})
        }
        
    } catch (error) {
        if(error.message === "jwt expired"){
            if(req.url === '/signup'){
                return res.render('auth/signup',  {email:null, emailErr: false, passwordErr: false, err: null})
            }
            res.render('auth/login',  {email:null, emailErr: false, passwordErr: false, err: null})
        }
        next(error)
    }
}

module.exports = {authChecker}