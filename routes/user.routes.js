const router =require("express").Router();

const {registerUser,loginUser,updateUserDetails} =require("../controllers/user.controller");


router.post("/signup",registerUser);
router.post("/login",loginUser);
router.put("/update/:id",updateUserDetails);



module.exports =router;
    