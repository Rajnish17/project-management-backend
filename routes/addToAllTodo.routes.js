const {
    FindFromTodoAddToProgress,
    FindFromTodoAddToDone,
    FindFromTodoAddToBacklog,
    FindFromBacklogAddToDone,
    FindFromBacklogAddToTodo,
    FindFromBacklogAddToProgress,
    FindFromProgressAddToDone,
    FindFromProgressAddToDo,
    FindFromProgressAddToBacklog,
    FindFromDoneAddToBacklog,
    FindFromDoneAddToTodo,
    FindFromDoneAddToProgress
} = require("../controllers/addToAllTodo");

const router = require("express").Router();

// Route to add Todo item to Progress
router.post("/todo/progress/:id", FindFromTodoAddToProgress);

// Route to add Todo item to Done
router.post("/todo/done/:id", FindFromTodoAddToDone);

// Route to add Todo item to Backlog
router.post("/todo/backlog/:id", FindFromTodoAddToBacklog);

// Route to add Backlog item to Done
router.post("/backlog/done/:id", FindFromBacklogAddToDone);

// Route to add Backlog item to Todo
router.post("/backlog/todo/:id", FindFromBacklogAddToTodo);

// Route to add Backlog item to Progress
router.post("/backlog/progress/:id", FindFromBacklogAddToProgress);

// Route to add Progress item to Done
router.post("/progress/done/:id", FindFromProgressAddToDone);

// Route to add Progress item to Todo
router.post("/progress/todo/:id", FindFromProgressAddToDo);

// Route to add Progress item to Backlog
router.post("/progress/backlog/:id", FindFromProgressAddToBacklog);

// Route to add Done item to Backlog
router.post("/done/backlog/:id", FindFromDoneAddToBacklog);

// Route to add Done item to Todo
router.post("/done/todo/:id", FindFromDoneAddToTodo);

// Route to add Done item to Progress
router.post("/done/progress/:id", FindFromDoneAddToProgress);

module.exports = router;
