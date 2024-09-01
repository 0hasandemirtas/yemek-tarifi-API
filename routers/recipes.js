var bodyParser = require("body-parser");
const express = require('express');
const {r} = require("../database");
var cors = require("cors");
const router=express.Router();
router.use(cors());
router.use(bodyParser.json());
const userAuth = require("../middleware/auth")

const {getAllRecipes, getByIdRecipes, postAllRecipes, deleteRecipes, putRecipes, getByUserRecipes}=require("../controllers/recipes")

router.get("/",getAllRecipes);
  
router.get("/:id",getByIdRecipes );

router.get("/users/:users",userAuth,getByUserRecipes );

router.post("/",postAllRecipes);

router.delete("/:id",deleteRecipes);

router.put("/:id",putRecipes);

module.exports = router;