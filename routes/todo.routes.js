const router =require("express").Router();

const {
    createTodo,
    getAllTasks,
    getSingleTask,
    updateTask,
    deleteTask,
    filterTasksByDueDate
} =require("../controllers/todo.controller");


router.post("/add",createTodo);
router.get("/getall",getAllTasks);
router.get("/getone/:id",getSingleTask);
router.patch("/update/:id",updateTask);
router.delete("/delete/:id",deleteTask);
router.get("/filter/:timeframe",filterTasksByDueDate);



module.exports =router;
    