//dependencies
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {notFoundHandler, errorHandler} = require('./middlewares/common/errorHandler');
const authRouter = require("./routers/authRouter");
const { authChecker } = require("./middlewares/middleAuth/authMiddleware");
const todoRouter = require("./routers/todoRouter");
const Todo = require("./models/Todo");
const indexController = require("./controllers/indexController");


//initialization and config
const app = express();
dotenv.config();
app.set('view engine', 'ejs')


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRETE));
app.use(express.static('public'));

//routers
app.use(authRouter)
app.use(todoRouter)
app.get('/', authChecker, indexController)

//not found handler
app.use(notFoundHandler)
app.use(errorHandler)


//app listening
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
  app.listen(process.env.PORT || 3000, ()=>{
      console.log("Server is running " + process.env.PORT);
  })
})