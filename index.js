import bodyParser from "body-parser";
import express from "express";

const port = 4000;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var idCount =2;
var list=[{
    id:1,
    title: "The Rise of Decentralized Finance",
    blog:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
},
{
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    blog:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
}];

app.get("/posts",(req,res)=>{
    res.json(list);
})

app.get("/posts/:id",(req,res)=>{
    const ID = parseInt(req.params.id);
    const disp = list.findIndex((li)=> li.id===ID);
    res.json(list[disp]);
});

app.post("/new",(req,res)=>{
    var addBlog={
        id:++idCount,
        title:req.body.title,
        blog:req.body.blog,
        author:req.body.author
    };
    list.push(addBlog);
    res.status(201).json(addBlog);
});

app.delete("/delete/:id",(req,res)=>{
    const ID = parseInt(req.params.id);
    const index = list.findIndex((blog)=>blog.id===ID);
    list.splice(index,1);
    res.json(list);
});


app.patch("/edit/:id",(req,res)=>{
    const ID = parseInt(req.params.id);
    const index = list.findIndex((blog)=>blog.id===ID);
    var addBlog={
        id:ID,
        title:req.body.title,
        blog:req.body.blog,
        author:req.body.author
    };
    list[(index)] = addBlog;
    res.json(list);
});
app.listen(port,()=>{
    console.log("API is running!!");
});
