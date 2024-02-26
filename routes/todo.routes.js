const router =require("express").Router();
const {verifyToken} =require("../middleware/verifyToken");


const {
    createTodo,
    getAllTodo,
    getShareTodo,
    updateTodo,
    deleteTodo,
    filterTodoByDueDate,
    getAllTodoOfSingleUser
} =require("../controllers/todo.controller");


router.post("/add",verifyToken,createTodo);
// router.get("/getall",getAllTodo);
router.get("/getall/:id",verifyToken,getAllTodoOfSingleUser);
router.get("/getone/:id",getShareTodo);
router.patch("/update/:id",updateTodo);
router.delete("/delete/:id",verifyToken,deleteTodo);
router.get("/filter/:timeframe",filterTodoByDueDate);



module.exports =router;
    