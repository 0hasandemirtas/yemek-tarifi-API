const {r} = require("../database");

const getAllRecipes =  (req,res)=> {
    r.db("recipes")
      .table("recipe")
      .then((recipe) => {
        res.statusCode = 200;
        res.send({
          message: "Success",
          code: 200,
          payload: recipe,
        });
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send({
          message: err.message,
          code: 500,
          payload: err,
        });
      });
}

const getByIdRecipes = (req,res) =>{
  r.db("recipes")
      .table("recipe")
      .get(req.params.id)
      .then((recipe) => {
        res.statusCode = 200;
        res.send({
          message: "Success",
          code: 200,
          payload: recipe,
        });
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send({
          message: err.message,
          code: 500,
          payload: err,
        });
      });
}

const postAllRecipes = (req,res)=>{
  const newRecipe = req.body;
    console.log(req.body);
    r.db("recipes")
      .table("recipe")
      .insert(newRecipe)
      .then((recipe) => {
        res.statusCode = 201;
        res.send({
          message: "eklendi",
          code: 201,
          payload: recipe,
        });
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send({
          message: err.message,
          code: 500,
          payload: err,
        });
      });
}

const deleteRecipes = (req,res) => {
  const id = req.params.id;
    r.db("recipes")
      .table("recipe")
      .get(id)
      .delete()
      .then((recipe) => {
        res.statusCode = 200;
        res.send({
          message: "silindi",
          code: 200,
          payload: recipe,
        });
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send({
          message: err.message,
          code: 500,
          payload: err,
        });
      });
}

const putRecipes =(req,res) =>{
  const id = req.params.id;
    const updateRecipe = req.body;
    console.log(updateRecipe);
    r.db("recipes")
      .table("recipe")
      .get(id)
      .update(updateRecipe)
      .then((recipe) => {
        res.statusCode = 200;
        res.send({
          message: "güncellendi",
          code: 200,
          payload: recipe,
        });
      })
      .catch((err) => {
        res.statusCode = 500;
        res.send({
          message: err.message,
          code: 500,
          payload: err,
        });
      });
}

module.exports={
    getAllRecipes,
    getByIdRecipes,
    postAllRecipes,
    deleteRecipes,
    putRecipes,
};