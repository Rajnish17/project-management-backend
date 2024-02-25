const router =require("express").Router();
const {verifyToken} =require("../middleware/verifyToken");


const {
    createTodo,
    getAllTasks,
    getSingleTask,
    updateTask,
    deleteTask,
    filterTasksByDueDate,
    getAllTasksOfSingleUser
} =require("../controllers/todo.controller");


router.post("/add",verifyToken,createTodo);
router.get("/getall",getAllTasks);
router.get("/getall/:id",verifyToken,getAllTasksOfSingleUser);
router.get("/getone/:id",getSingleTask);
router.patch("/update/:id",updateTask);
router.delete("/delete/:id",deleteTask);
router.get("/filter/:timeframe",filterTasksByDueDate);



module.exports =router;
    