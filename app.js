const express= require("express");
const app =express();
const cors =require("cors");
const userRoutes =require("./routes/user.routes");
app.use(express.json());
app.use(cors());



app.use("/user",userRoutes);


app.get("/",(req,res)=>{
    res.send("server is running")
})




module.exports=app