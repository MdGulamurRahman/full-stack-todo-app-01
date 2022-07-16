//not found handler
function notFoundHandler(req,res){
    try {
        res.render('common/notFound', {title: "404, Page not Found!", message: "Page not Found!"})
    } catch (error) {
        res.render('common/error', {title: "Error occurred", error})
    }
}

//error handler
function errorHandler(error, req,res,next){
    if(res.headerSent){
        next(error)
    } else{
        res.render('common/error', {title: "Error occurred", error})
    }
};

module.exports = {notFoundHandler, errorHandler}