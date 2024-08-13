var bodyParser = require("body-parser");
const express = require('express');
const {r} = require("../database");
var cors = require("cors");

const router=express.Router();
router.use(cors());
router.use(bodyParser.json());

const {registerUser,loginUser}=require("../controllers/auth")

    router.post("/",registerUser);
    router.post("/login",loginUser);

module.exports = router;