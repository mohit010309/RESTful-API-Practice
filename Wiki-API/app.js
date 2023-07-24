const express=require('express');
const mongoose=require('mongoose');
const ejs=require('ejs');
const bodyParser=require('body-parser');

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

const articleSchema = new mongoose.Schema({
    title:String,
    content:String
});

const articleModel = mongoose.model("article",articleSchema);

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});

// this is the home route
app.get("/",function(req,res){
    res.send("This is the starting page");
});


// this is the /articles route
// app.get("/articles",function(req,res){
//     articleModel.find({}).then(function(result){
//         res.send(result);
//     });
// });

// this is the /articles post route
// app.post("/articles",function(req,res){
//     const newTitle=req.body.title;
//     const newContent=req.body.content;
//     const newItem = new articleModel({
//         title:newTitle,
//         content:newContent
//     });
//     newItem.save().then(function(){
//         res.send("Thanks for posting....");
//     });
// });

// this is the /articles delete route
// app.delete("/articles",function(req,res){
//     articleModel.deleteMany({}).then(function(err){
//         console.log(err);
//         res.send("All records deleted successfully....");
//     });
// });


// Using chained route handlers for /articles route
app.route("/articles")
    .get(function(req,res){
        console.log("Inside the chained route get...");
        articleModel.find({}).then(function(result){
            res.send(result);
        });
    })
    .post(function(req,res){
        console.log("Inside the chained route post...");
        const newTitle=req.body.title;
        const newContent=req.body.content;
        const newItem = new articleModel({
            title:newTitle,
            content:newContent
        });
        newItem.save().then(function(){
            res.send("Thanks for posting....");
        });
    })
    .delete(function(req,res){
        console.log("Inside the chained route delete...");
        articleModel.deleteMany({}).then(function(err){
            console.log(err);
            res.send("All records deleted successfully....");
        });
    });


// Using chained route handlers for /:anyRoute route
app.route("/articles/:routeName")
    .get(function(req,res){
        articleModel.findOne({title:req.params.routeName}).then(function(result){
            //console.log(result);
            if(result)
                res.send(result);
            else
                res.send("No article found...");
        });
    })
    .put(function(req,res){
        articleModel.replaceOne({title:req.params.routeName},{title:req.body.title,content:req.body.content}).then(function(logs){
            console.log(logs);
        });
    })
    .patch(function(req,res){
        articleModel.updateOne({title:req.params.routeName},req.body).then(function(logs){
            console.log(logs);
        });
    })
    .delete(function(req,res){
        articleModel.deleteOne({title:req.params.routeName}).then(function(logs){
            console.log(logs);
        });
    });