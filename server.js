import axios from "axios";
import bodyParser from "body-parser";
import express from "express";

const port = 3000;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
const API = "http://localhost:4000";

app.get("/",async(req,res)=>{
    try{
        const resp = await axios.get(API+"/posts");
        console.log(resp.data)
        res.render("index.ejs",{content:resp.data});
    }catch(error){
        console.log("error");
    }
});

app.get("/new",(req,res)=>{
    res.render("modified.ejs",{
        page : "NEW POST",
        add : "/save",
        content : ""
    });
});

app.post("/save",async(req,res)=>{
    try{
        await axios.post(API+"/new",req.body);
        res.redirect("/");
    }catch(error){
        console.log(error);
    }  
});

app.get("/delete/:id",async(req,res)=>{
    try{
        await axios.delete(API+"/delete/"+req.params.id);
        res.redirect("/");
    }catch(error){
        console.log(error);
    }
});

app.post("/edit/page/:id",async(req,res)=>{
    try{
        await axios.patch(API+"/edit/"+req.params.id,req.body);
        res.redirect("/");
    }catch(error){
        console.log("error");
    }
});

app.get("/edit/:id",async(req,res)=>{
    const ID=req.params.id;
    try{
        const resp= await axios.get(API+"/posts/"+ID);
        const cont = resp.data;
        res.render("modified.ejs",{
            page:"EDIT BLOG",
            add :"/edit/page/"+ID,
            content : cont
            });
    }catch(error){
        console.log("error");
    }  
});

app.listen(port,()=>{
    console.log("Backend is running on 3000!!");
});
