const mongoose=require("mongoose");

const blogSchema= new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    message:{
        type:String
    },
    to:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
})

const Blogs=mongoose.model("Blogs",blogSchema);

module.exports=Blogs;