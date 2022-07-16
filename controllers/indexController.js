const Todo = require("../models/Todo");

const indexController = async (req,res)=>{
    try {
      const todos = await Todo.find({user: req.email});
      res.render('index', {todos})
    } catch (error) {
      throw error
    }
  }

module.exports = indexController;