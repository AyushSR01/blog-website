const mongoose=require("mongoose");            //initial data stored
const Blogs=require("./models/blog.js") ;

main()
.then(()=>{console.log("success");})
.catch((err)=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/blogs");
}


let allblogs=[{
    from:"user1",
    message:"hy",
    to:"user2",
    date:new Date(),
    },{
    from:"user2",
    message:"hy",
    to:"user3",
    date:new Date(),
},
{
    from:"user3",
    message:"hy",
    to:"user4",
    date:new Date(),
},{
    from:"user4",
    message:"hy",
    to:"user5",
    date:new Date(),
}];

Blogs.insertMany(allblogs);

