const {Router} = require('express');
const { addnewTaskHandler, deleteTaskHandler, updateTaskHandler, updateNewTaskHandler } = require('../controllers/todo/todoControllers');
const { authChecker } = require('../middlewares/middleAuth/authMiddleware');
const todoRouter = Router();

//add new task
todoRouter.post("/addnewTask", authChecker, addnewTaskHandler )
//delete a task
todoRouter.get("/deleteTask/:taskId", authChecker, deleteTaskHandler)
//update task status
todoRouter.get("/updateStatus/:taskId", authChecker, updateTaskHandler)
// update a task with new route
todoRouter.post("/updateTask", authChecker, updateNewTaskHandler)

module.exports = todoRouter;