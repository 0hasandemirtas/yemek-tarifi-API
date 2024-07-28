const express = require('express');
var cors = require("cors");
var bodyParser = require("body-parser");
const router=express.Router();
router.use(cors());
router.use(bodyParser.json());
const {getAllRecipes, getByIdRecipes, postAllRecipes, deleteRecipes, putRecipes}=require("../controllers/recipes")
var r = require("rethinkdbdash")({
    servers: [
      {
        host: "localhost",
        port: 28015,
      },
    ],
  });

router.get("/",getAllRecipes);
  
  router.get("/:id",getByIdRecipes );
  
  router.post("/",postAllRecipes);
  
  router.delete("/:id",deleteRecipes);
  
  router.put("/:id",putRecipes);

module.exports = router;