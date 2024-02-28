const CountAllTasks = require("../controllers/taskCount.controller");
const router = require("express").Router();


router.get("/alltask/:id",CountAllTasks );



module.exports = router;