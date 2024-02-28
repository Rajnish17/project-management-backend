const router = require("express").Router();
const { AddToDone, GetAllDone, UpdateDone, DeleteDone ,shareDone}
 = require("../controllers/done.controller");


router.post("/addtodone/:id", AddToDone);
router.get("/getall/:id", GetAllDone);
router.get("/getone/:id", shareDone);
router.put("/update/:id", UpdateDone);
router.delete("/delete/:id", DeleteDone);

module.exports = router;