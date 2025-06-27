const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Blogs=require("./models/blog.js") ;
const methodOverride=require('method-override');


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

main()
.then(()=>{console.log("success");})
.catch((err)=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/blogs");
}

let port=8080;
app.listen(port,()=>{
    console.log("app is listenning");
});

app.get("/",(req,res)=>{
    res.send("Working Fine");
});

app.get("/blogs",async (req,res)=>{
    let posts= await Blogs.find();
    res.render("post.ejs",{posts});
}
);
app.get("/blogs/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/blogs",(req,res)=>{
    let {from,mssge,to}=req.body;
    let newBlog=new Blogs({
        from:from,
        message:mssge,
        to:to,
        date:new Date(),
    });
    
    res.redirect("/blogs");
    newBlog.save().then((res)=>{console.log("data saved");})
    .catch((err)=>{console.log("ERROR");})
})

app.get("/blogs/:id/edit", async (req,res)=>{
    let {id}=req.params;
    let newblog= await Blogs.findById(id);
    res.render("edit.ejs",{newblog});
})

app.put("/blogs/:id",async (req,res)=>{
    let {id}=req.params;
    let {message:update}=req.body;
    let updatedblog=await Blogs.findByIdAndUpdate(id,{message:update},{runValidators:true,new:true});
    console.log(updatedblog);
    res.redirect("/blogs");
})
app.delete("/blogs/:id", async (req,res)=>{
    let {id}=req.params;
    await Blogs.findByIdAndDelete(id);
    res.redirect("/blogs");
})