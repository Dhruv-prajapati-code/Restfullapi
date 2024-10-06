const express=require("express");
const app=express();

const port=8080;

const path=require("path");

const {v4:uuid4}=require("uuid");


app.use(express.urlencoded({extended:true}));//fetching data without encription

app.set("view engine","ejs");//For using ejs and rendering it from another directory

app.set("views", path.join(__dirname,"views"));//Joining path so that it can be run from anywhere

app.set(express.static(path.join(__dirname,"public")));

let posts=[{
    id:uuid4(),
    username:"Dhruv",
    content:"traveling"
},
{   
    id:uuid4(),
    username:"Ram",
    content:"traveling"
},
{   id:uuid4(),
    username:"Lakhan",
    content:"traveling"
},
{   id:uuid4(),
    username:"Hanuman",
    content:"Praying"
}];


app.get("/posts",(req,res)=>{
    res.render("all.ejs",{posts});
});

app.get("/",(req,res)=>{
    res.send("Srver is working");
});

app.get("/posts/new",(req,res)=>{
    res.render("form.ejs");
});

app.post("/posts",(req,res)=>{
    let newid=uuid4();
    let{username,content}=req.body;
    posts.push({newid,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id}= req.params;
    let post=posts.find((p)=> id === p.id);
    console.log(post);
    res.render("id.ejs",{post});
    
});



app.listen(port,function(){
    console.log("listning on port 8080");
});
