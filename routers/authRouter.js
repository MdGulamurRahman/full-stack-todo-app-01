//dependencies
const {Router} = require('express');
const { loginPageHandler, signupPageHandler, signupPostHandler, loginPostHandler, logoutHandler } = require('../controllers/auth/auth');
const { authChecker } = require('../middlewares/middleAuth/authMiddleware');
//Router
const authRouter = Router();

//signup page handler
authRouter.get('/signup', authChecker, signupPageHandler)
//signup post handler
authRouter.post('/signup', signupPostHandler)

//login page handler
authRouter.get('/login', authChecker, loginPageHandler);
//login post handler
authRouter.post('/login', loginPostHandler);
//logout
authRouter.get("/logout", logoutHandler)


//exports
module.exports = authRouter;