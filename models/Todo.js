const {Schema, model} = require("mongoose");

const todoSchema = new Schema({
    taskname: {
        type: String,
        required: true,
        trim: true
    },
    priority: {
        type: String,
        required: true,
        trim: true
    },
    
    date: {
        type: Date,
        required: true,
        trim: true
    },
    status:{
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: String,
        required: true,
        trim: true
    }
})

const Todo = model("Todo", todoSchema);
module.exports = Todo