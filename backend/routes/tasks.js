const express = require("express");
const Tasks = require("../models/task");
const multer = require("multer");
const router = express.Router();
const path = require("path");
module.exports = router;



router.get("/", async (req,res)=>{
    try {
        const tasks = await Tasks.find();
        res.json({success:true, data:tasks});
    } catch (error) {
        res.json({success:false, data:error.message})
    }
});

router.get("/:id", async (req,res)=>{
    if(req.params){
        try {
            const task = await Tasks.findById(req.params.id);
            if(task){
                return res.json({success:true, data:task});
            }
            return res.json({success:false, data:"task got deleted from database"});
        } catch (error) {
            return res.json({success:false, msg:error.message});
        }
    }
    else{
        return res.json({success:false, msg:"Request is empty!"});
    }

});
router.get("/date/:day/:month/:year", async (req,res)=>{
    if(req.params){
        try {
        const taskDate = await Tasks.find({dueDate:`${req.params.day}/${req.params.month}/${req.params.year}`} );
            if(taskDate){
                return res.json({success:true, data:taskDate});
            }
            return res.json({success:false, data:"task got deleted from database"});
        } catch (error) {
            return res.json({success:false, msg:error.message});
        }
    }
})
router.post("/add", async (req,res)=>{
    try {
        await Tasks.create(req.body);
        return res.status(200).json({success:true,msg:"Task created successfuly"});
    } catch (error) {
        if("errors" in error){
            let errors = [] ;
            Object.keys(error.errors).forEach(err => {
                errors.push(error.errors[err].message)
            });
            return res.json({success:false, msg:errors});

        }
        else
            return res.json({success:false, msg:error});
    }
});
const storageEngine = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"../frontend/task-manager-app/public/images")
    },
    filename: async (req,file,cb)=>{
        const task =  await Tasks.findOne().sort({_id : -1});
        try {
            await Tasks.updateOne({_id:task.id},{path: "images/"  + task.id+".png"});            
        } catch (error) {
        }
        cb(null,task.id+".png");
    }
});
const upload = multer({storage:storageEngine});
router.post("/upload",upload.single("image"),(req,res)=>{
    res.send("Image downloaded succesfuly!");
});
router.put("/:id", async (req,res)=>{
    try {
        await Tasks.updateOne(Tasks.findById(req.params.id),req.body);
         return res.json({success:true, msg:"Task updated successfuly"})
    } catch (error) {
        return res.json({success:false, msg:error.message})        
    }

});

router.delete("/:id",async (req,res)=>{
    try {
        await Tasks.deleteOne(Tasks.findById(req.params.id));
        
        return res.json({success:true,msg:"Task deleted successfuly"});
    } catch (error) {
        return res.json({success:false,msg:error.message});
    }
});