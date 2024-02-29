const {CountAllTasks,ShareTodo} = require("../controllers/taskCount.controller");
const router = require("express").Router();


router.get("/alltask/:id",CountAllTasks );
router.get("/share/:id",ShareTodo );



module.exports = router;