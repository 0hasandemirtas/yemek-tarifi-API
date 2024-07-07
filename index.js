var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var r = require('rethinkdbdash')({
    servers:[
        {
            host: 'localhost',
            port: 28015
        }
]

});

var app=express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", async(req, res)=>{
    r.db("recipes")
        .table("recipe")
        .then((recipe)=>{
            res.statusCode=200;
            res.send({
                message:"Success",
                code: 200,
                payload:recipe
            });
        })
        .catch((err)=>{
            res.statusCode=500;
            res.send({
                message:err.message,
                code:500,
                payload:err
            });
        });
});

app.post("/", async (req, res) => {
    const newRecipe=req.body;
    r.db("recipes")
        .then("recipe")
        .insert(newRecipe)
        .then((recipe)=>{
            res.statusCode=500;
            res.send({
                message:"eklendi",
                code: 200,
                payload: recipe
            });
        })
        .catch((err)=>{
            res.statusCode=500;
            res.send({
                message:err.message,
                code:500,
                payload:err
            });
        });
});

app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    r.db("recipes")
        .table("recipe")
        .get(id)
        .delete()
        .then((recipe) =>{
            res.statusCode=200;
            res.send({
                message:"silindi",
                code: 200,
                payload: recipe
            });
        })
        .catch((err) => {
            res.statusCode=500;
            res.send({
                message:err.message,
                code:500,
                payload:err
            });
        });
});

app.put("/:id", async(req, res) =>{
    const id = req.params.id;
    const updateRecipe = req.body;
    r.db("recipes")
        .table("recipe")
        .get(id)
        .update(updateRecipe)
        .then((recipe) =>{
            res.statusCode=200;
            res.send({
                message:"güncellendi",
                code: 200,
                payload: recipe
            })
        })
        .catch((err) => {
            res.statusCode=500;
            res.send({
                message:err.message,
                code:500,
                payload:err,
            });
        });
});

app.listen(3000);