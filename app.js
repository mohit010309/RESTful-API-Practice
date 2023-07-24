const express=require('express');
const app=express();

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});

// app.get("/",function(req,res){
//     res.send("Inside the get route.");
// });

// app.post("/",function(req,res){
//     res.send("Inside the post route...");
// });

// app.delete("/",function(req,res){
//     res.send("Inside the delete route.....");
// });

app.route("/")
    .get(function(req,res){
        res.send("using express inside get");
    })
    .post(function(req,res){
        res.send("using express inside post");
    })
    .delete(function(req,res){
        res.send("using express inside delete");
    });