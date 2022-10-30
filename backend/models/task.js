const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title:
    {
        type:String,
        required:[true,"Title is required"],
        validate:{
            validator: value=>{
                if(value.length < 6)
                return false
                else if (value.length >40){
                    return false
                }
                return true
            },
            message: ({value}) => {
                if(value.length < 6)
                return `Title must be atleast 6, got only ${value.length} char`;
                else if (value.length >15){
                    return `Title must be max 40, got ${value.length} char`;
                }
            },
        },
    },
    description:
    {
        type:String,
        required:false
    },
    dueDate:{
        type:String,
        validate:{
            validator: value=> value == "dd-mm-yyyy"?false:true,
            message: () => "Date is required",
        },
        required: true,
    },
    time:{
        type:String,
        validate:{
            validator: value=> value == ":"?false:true,
            message: () => "Time is required",
        },
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    path:{
        type:String,
        required:false,
        default: "/"
    },
    completed:{
        type:Boolean,
        required:false,
        default:false,
    }
});

module.exports = mongoose.model("task", taskSchema );