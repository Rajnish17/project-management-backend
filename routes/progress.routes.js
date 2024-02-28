const router = require("express").Router();
const { AddToProgress, GetAllProgress, UpdateProgress, DeleteProgress ,shareProgress}
 = require("../controllers/progress.controller");


router.post("/addtoprogress/:id", AddToProgress);
router.get("/getall/:id", GetAllProgress);
router.get("/getone/:id", shareProgress);
router.put("/update/:id", UpdateProgress);
router.delete("/delete/:id", DeleteProgress);

module.exports = router;