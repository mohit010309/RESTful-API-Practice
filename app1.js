const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://127.0.0.1:27017/testDB");
const testSchema = new mongoose.Schema({
    name:String,
    age:Number
});

const testModel = mongoose.model("testc",testSchema,"testc");

app.get("/",function(req,res){
    testModel.find({}).then(function(data){
        res.send(data);
    });
});

app.put("/:name",function(req,res){
    const rn = req.params.name;
    const newName=req.body.name;
    const newAge=req.body.age;
    testModel.replaceOne({name:rn},{name:newName,age:newAge}).then(function(logs){
        console.log(logs);
    });
});

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});

app.post("/",function(req,res){
    console.log(req.body);
});

app.patch("/:name",function(req,res){
    const rn = req.params.name;
    console.log(req.body);
    console.log(rn);
    testModel.updateOne({name:rn},req.body).then(function(logs){
        console.log(logs);
    });
});

