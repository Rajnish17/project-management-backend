const express= require("express");
const app =express();
const cors =require("cors");
const userRoutes =require("./routes/user.routes");
const todoRoutes = require("./routes/todo.routes");
const backlogRoutes = require("./routes/backlog.routes");
const progressRoutes = require("./routes/progress.routes");
const doneRoutes = require("./routes/done.routes");
const taskRoutes = require("./routes/taskCount.routes");
const addToAllTodoRoutes = require("./routes/addToAllTodo.routes");





app.use(express.json());
app.use(cors());



app.use("/user",userRoutes);
app.use("/todo",todoRoutes);
app.use("/backlog",backlogRoutes);
app.use("/progress",progressRoutes);
app.use("/done",doneRoutes);
app.use(taskRoutes);
app.use(addToAllTodoRoutes);


app.get("/",(req,res)=>{
    res.send("server is running")
})




module.exports=app