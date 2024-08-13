var bodyParser = require("body-parser");
const express = require('express');
const {r} = require("../database");
var cors = require("cors");
const router=express.Router();
router.use(cors());
router.use(bodyParser.json());
const auth = require("../middleware/auth")

const {getAllRecipes, getByIdRecipes, postAllRecipes, deleteRecipes, putRecipes}=require("../controllers/recipes")

router.get("/",getAllRecipes);
  
router.get("/:id",getByIdRecipes );

router.post("/",postAllRecipes);

router.delete("/:id",deleteRecipes);

router.put("/:id",putRecipes);

module.exports = router;