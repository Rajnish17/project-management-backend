const { AddToBacklog, GetAllBacklog, UpdateBacklog, DeleteBacklog,shareBacklog } = require("../controllers/backlog.controller");
const router = require("express").Router();


router.post("/addtobacklog/:id", AddToBacklog);
router.get("/getall/:id", GetAllBacklog);
router.get("/getone/:id", shareBacklog);
router.put("/update/:id", UpdateBacklog);
router.delete("/delete/:id", DeleteBacklog);

module.exports = router;